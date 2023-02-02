import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      username: [],
      password: [],
      fullName: [],
      email: [],
      phone: [],
      dateOfBirth: [],
      gender: []
    });
  }

  ngOnInit(): void {}

  signUp(){
    this.authService.signUp(this.formGroup.getRawValue())
  }
}
