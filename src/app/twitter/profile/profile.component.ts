import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {Follow} from '../../model/follow';
import {FollowService} from '../../service/follow.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: RouterModule, private userService: UserService,
              private followService: FollowService, private snackBar: MatSnackBar) { }

  idUser;
  idFollow;
  profile: User;
  follow: Follow;

  ngOnInit(): void {
    this.idUser = this.route.snapshot.queryParamMap.get('idUser') === null ? -1 : +this.route.snapshot.queryParamMap.get('idUser');
    this.idFollow = this.route.snapshot.queryParamMap.get('idFollow') === null ? -1 : +this.route.snapshot.queryParamMap.get('idFollow');
    console.log(this.idUser);
    console.log(this.idFollow);
    /*
    * if idUser is -1 idFollow is -1 go at home
    * */
    this.userService.get(this.idFollow).subscribe(
      data => {
        this.profile = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  followThis(){
    this.follow = new Follow(null, this.idUser, this.idFollow, new Date());
    this.followService.save(this.follow).subscribe(
      data => {
        this.follow = data;
        this.openSnackBar('Already you are follower this profile.', 'Ok');
      },
      error => {
        this.openSnackBar('Can´t follower this profile.', 'Retry');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
