import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, OnDestroy {

  id;
  user: User;

  sub: any;

  matcher = new MyErrorStateMatcher();

  errorRegister = false;
  confirm = '';

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.userService.get(this.id).subscribe(
        data => {
          this.user = data;
        },
        error => {
          console.error(error);
        }
      );
    });
  }

  onSave() {
    console.log(this.user);
    if (this.isValid()) {
      this.userService.update(this.user, this.id).subscribe(
        user => {
          if (user === null) {
            this.errorRegister = true;
            this.openSnackBar('Username exist.', 'Retry');
          } else {
            this.openSnackBar('Registered user successfully, please login.', 'Welcome');
            this.router.navigate(['']);
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

  onDelete() {
    this.userService.delete(this.user.username).subscribe(
      data => {
        if (data === true){
          this.openSnackBar('User delete Ok', 'OK');
          this.router.navigate(['login']);
        } else {
          this.openSnackBar('Can´t User delete', 'Retry');
        }
      },
      error => {
        this.openSnackBar('Can´t User delete', 'Retry');
      }
    );
  }


  isValid() {
    this.errorRegister = false;
    let result = true;

    if (this.user.username === null || this.user.username.length === 0) {
      result = false;
    }

    if (this.user.pass === null || this.user.pass.length === 0) {
      result = false;
    }

    if (this.confirm === null || this.confirm.length === 0 || this.confirm !== this.user.pass) {
      this.confirm = '';
      result = false;
    }

    return result;
  }

  openSnackBar(message
                 :
                 string, action
                 :
                 string
  ) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
