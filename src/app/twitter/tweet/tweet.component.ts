import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {PostService} from '../../service/post.service';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../../model/post';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit, OnDestroy {

  id: number;
  sub: any;
  user: User;
  post: Post;

  constructor(private postService: PostService, private userService: UserService, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private router: Router) {
    this.post = new Post(null, '', null, null);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
      this.userService.get(this.id).subscribe(
        data => {
          this.user = data;
          this.post.idUser = this.user.idUser;
        },
        error => {
          console.error(error);
        }
      );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  savePost(){
    if (this.post.message != null){
      this.postService.save(this.post).subscribe(
        data => {
          this.post = new Post(null, '', null, this.user.idUser);
          this.openSnackBar('Your tweet save.', 'OK');
          this.router.navigate(['twitter', this.user.idUser]);
        },
        error => {
          this.openSnackBar('Error save tweet.', 'Retry');
          console.error(error);
          return null;
        }

      );
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
