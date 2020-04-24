import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {PostService} from '../../service/post.service';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';
import {FollowService} from '../../service/follow.service';
import {Follow} from '../../model/follow';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit, OnDestroy {

  followers = [];
  users = [];

  id: number;
  sub: any;
  user: User;
  follow: Follow;

  constructor(private followService: FollowService, private userService: UserService, private route: ActivatedRoute,
              private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.loadFollowers();
    });
  }

  loadFollowers(){
    this.followService.getAllByFollow(this.id).subscribe(
      data => {
        this.followers = data;
        console.log(this.followers);
        for (const follower of this.followers){
          this.setUser(follower.idUser);
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  getTimeNow(createAt){
    const now = new Date();
    return moment(new Date(createAt), 'YYYYMMDD').fromNow();
  }

  setUser(id){
    this.userService.get(id).subscribe(
      data => {
        this.users.push(data);
        console.log(this.users);
      }
    );
  }

  getUsername(id){
    if (this.users.length > id){
      return this.users[id].username;
    }
    return '';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  followThis(follow){
    this.follow = new Follow(null, this.id, follow, new Date());
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

}
