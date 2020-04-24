import { Component, OnInit } from '@angular/core';
import {PostService} from '../../service/post.service';
import * as moment from 'moment';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts = [];
  users = [];
  idUser;

  constructor(private postService: PostService, private userService: UserService,
              private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.parent.params.subscribe(params => {
      this.idUser = +params["id"];

      this.postService.getAll().subscribe(
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
    });
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

  goProfile(idFollow){
    this.router.navigate(['../profile'], { queryParams : { idUser: this.idUser, idFollow  } , relativeTo: this.route} );
  }

}
