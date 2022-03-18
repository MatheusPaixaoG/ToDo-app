import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public frm!: FormGroup;

  public isBusy = false;
  public hasFailed = false;
  public showInputErrors = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.frm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  public doSignIn() {
    // Make sure forms are valid
    if (this.frm.invalid) {
      this.showInputErrors = true;
      return;
    }

    // Reset status
    this.isBusy = true;
    this.hasFailed = false;

    // Grab values from form
    const username = this.frm.get('username')?.value;
    const password = this.frm.get('password')?.value;

    // Submit request to API
    this.api.signIn(username, password).subscribe({
      next: (response: any) => {
        console.log(response.name);
        console.log(response.token);
        this.auth.doSignIn(
          response.token,
          response.name
        );
        console.log('depois do auth')
        this.router.navigate(['todos']);
      },
      error: (error) => {
        this.isBusy = false;
        this.hasFailed = true;
      }
    });
  }

}
