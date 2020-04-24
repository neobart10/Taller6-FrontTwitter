import {Injectable } from '@angular/core';
import {HttpUtil} from '../util/http.util';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import { User } from '../model/user';
import {Post} from '../model/post';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PostService {

  constructor(private http: HttpUtil) {
  }

  getAll(): Observable<Array<Post>> {
    return this.http.get(environment.url + '/post').pipe(map(
      (data: any) => {
        return data.data.map(
          json => Post.fromJson(json)
        );
      }
    ));
  }

  getAllById(id): Observable<Array<Post>> {
    return this.http.get(environment.url + '/post/user/' + id).pipe(map(
      (data: any) => {
        return data.data.map(
          json => Post.fromJson(json)
        );
      }
    ));
  }


  get(id): Observable<User> {
    return this.http.get(environment.url + '/users/' + id).pipe(map(
      (data: any) => {
        if (data === null){
          console.error('204 - User not exist.');
          return null;
        } else {
          return User.fromJson(data);
        }
      }
    ));
  }

  save(post): Observable<Post> {
    return this.http.post(environment.url + '/post', JSON.stringify(post),
      new HttpHeaders({'Content-Type' : 'application/json'})).pipe(map(
      (data) => {
        if (data != null) {
          return null;
        } else {
          return Post.fromJson(data);
        }
      }
    ));
  }

  update(user, id): Observable<User> {
    return this.http.put(environment.url + '/users/' + id, JSON.stringify(user),
      new HttpHeaders({'Content-Type' : 'application/json; charset=UTF-8;'})).pipe(map(
      (data: any) => {
        if (data === null){
          console.error('204 - User not exist.');
          return null;
        } else {
          return User.fromJson(data);
        }
      }
    ));
  }

  delete(id) {
    return this.http.delete(environment.url + '/post/' + id).pipe(map(
      (data: any) => {
        if (data !==  '0'){
          return true;
        } else {
          console.error('204 - Route not Exist');
          return false;
        }
      }
    ));
  }

}
