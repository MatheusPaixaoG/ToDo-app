import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public frm!: FormGroup;

  public isBusy = false;
  public hasFailed = false;
  public showInputErrors = false;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.frm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }

  public doRegister() {
    if (this.frm.invalid) {
      this.showInputErrors = true;
      return;
    }

    this.isBusy = true;
    this.hasFailed = false;

    const firstName = this.frm.get('firstName')?.value;
    const lastName = this.frm.get('lastName')?.value;
    const username = this.frm.get('username')?.value;
    const password = this.frm.get('password')?.value;

    this.api.register(firstName, lastName, username, password).subscribe({
      next: (response: any) => {
        this.router.navigate(['sign-in']);
      },
      error: (error) => {
        this.isBusy = false;
        this.hasFailed = true;
      }
    });
  }

}
