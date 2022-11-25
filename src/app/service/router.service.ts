import { Injectable } from "@angular/core";
import { Router, RoutesRecognized } from "@angular/router";
import { filter, pairwise } from "rxjs";
import { RouterItem } from "../interface/RouterItem";

@Injectable({
  providedIn: "root",
})
export class RouterService {
    previousUrl: string = "";
    nameUrl: string = "";

    constructor(public router: Router) {}

    getPreviousRoute(): RouterItem{
      this.router.events
        .pipe(
          filter((e: any) => e instanceof RoutesRecognized),
          pairwise()
        )
        .subscribe((e: any) => {
          console.log(e[0].urlAfterRedirects); // previous url
          this.previousUrl = e[0].urlAfterRedirects;

          this.nameUrl = e[0].urlAfterRedirects.slice(1);
          this.nameUrl = this.nameUrl.charAt(0).toUpperCase() + this.nameUrl.slice(1).toLowerCase();

        });
        return {
          nameUrl: this.nameUrl,
          url: this.previousUrl
        } ;
    }
}
