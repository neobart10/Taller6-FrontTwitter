import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  errorLogin = false;

  constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router) {
    this.user = new User(null, null, null, new Date());
  }

  ngOnInit(): void {
  }

  onLogin(){

    console.log(this.user);
    this.userService.login(this.user).subscribe(
      (data) => {
        if(data == null){
          this.errorLogin = true;
          console.error('Usuario no existe.');
          this.openSnackBar('User or Pass invalid.', 'Retry');
        }else {
          this.user = data;
          console.log(data);
          this.openSnackBar('User successfully logged in, please start your route plan.', 'Welcome');
          this.router.navigate(['/twitter', this.user.idUser]);
        }
      },
      (error) => {
        this.errorLogin = true;
        console.error('Usuario no existe.');
        this.openSnackBar('User or Pass invalid.', 'Retry');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
