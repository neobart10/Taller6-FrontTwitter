import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;


  matcher = new MyErrorStateMatcher();

  errorRegister = false;
  confirm = '';

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = new User(null, null, null, new Date());
  }

  onSave() {
    if (this.isValid()) {
      this.userService.save(this.user).subscribe(
        user => {
          if (user === null) {
            this.errorRegister = true;
            this.openSnackBar('Username exist.', 'Retry');
          } else {
            this.openSnackBar('Registered user successfully, please login.', 'Welcome');
            this.router.navigate(['login']);
          }
          this.user.pass = '';
          this.confirm = '';
        },
        (error) => {
          this.errorRegister = true;
          this.openSnackBar('User already exist', 'Retry');
        }
      );

    }
  }

  isValid(){
    this.errorRegister = false;
    let result = true;

    if (this.user.username === null || this.user.username.length === 0 ){
      result = false;
    }

    if (this.user.pass === null || this.user.pass.length === 0){
      result = false;
    }

    if (this.confirm === null || this.confirm.length === 0 || this.confirm !== this.user.pass){
      this.confirm = '';
      result = false;
    }

    return result;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
