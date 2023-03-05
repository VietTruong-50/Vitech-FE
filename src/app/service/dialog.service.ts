import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ConfirmDialogData } from "../interface/data";
import { ConfirmDialogComponent } from "../shared/confirm-dialog/confirm-dialog.component";
import { SpinnerLoadingComponent } from "../shared/spinner-loading/spinner-loading.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  spinnerDialogRef!: MatDialogRef<SpinnerLoadingComponent>;
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  
  constructor(public dialog: MatDialog) {}


  showSpinnerDialog() {
    this.spinnerDialogRef = this.dialog.open(SpinnerLoadingComponent, {
      panelClass: "reset-class",
      disableClose: true
    })
  }

  hideSpinnerDialog() {
    this.spinnerDialogRef.close();
  }
  
  showConfirmDialog({
    width,
    title,
    description,
    rejectText,
    acceptText,
    onAfterClosed,
    onReject,
  }: ConfirmDialogData) {
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: `${width == null ? "400px" : width}`,
      data: {
        title,
        description,
        rejectText,
        acceptText,
      },
    });

    this.confirmDialogRef.afterClosed().subscribe((accept) => {
      if (accept) {
        onAfterClosed(accept);
      } else {
        onReject ? onReject() : () => {};
      }
    });
  }
}
