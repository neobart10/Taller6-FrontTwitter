import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../service/post.service';
import {UserService} from '../../service/user.service';
import * as moment from 'moment';
import {User} from '../../model/user';
import {Post} from '../../model/post';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-mytweets',
  templateUrl: './mytweets.component.html',
  styleUrls: ['./mytweets.component.css']
})
export class MytweetsComponent implements OnInit, OnDestroy{

  posts = [];
  users = [];

  id: number;
  sub: any;
  user: User;

  constructor(private postService: PostService, private userService: UserService, private route: ActivatedRoute,
              private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.loadPost();
    });
  }

  loadPost(){
      this.postService.getAllById(this.id).subscribe(
        data => {
          this.posts = data;
          for (const post of this.posts){
            this.setUser(post.idUser);
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

  deleteTweet(id){
    this.postService.delete(id).subscribe(
      data => {
        if (data === true){
          this.openSnackBar('Delete tweet.', 'OK');
          this.loadPost();
        }else {
          this.openSnackBar('Can´t Delete tweet.', 'OK');
        }
      },
      error => {
        this.openSnackBar('Can´t Delete tweet.', 'Retry');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
