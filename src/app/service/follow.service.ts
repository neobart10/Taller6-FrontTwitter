import {Injectable, ViewEncapsulation } from '@angular/core';
import {HttpUtil} from '../util/http.util';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import { User } from '../model/user';
import {catchError} from 'rxjs/internal/operators';
import {isNull} from '@angular/compiler/src/output/output_ast';
import {Follow} from '../model/follow';

@Injectable()
export class FollowService {

  constructor(private http: HttpUtil) {
  }

  getAllByFollow(id): Observable<Array<Follow>> {
    return this.http.get(environment.url + '/follows/' + id).pipe(map(
      (data: any) =>
         data.data.map(
          json => Follow.fromJson(json)
        )
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

  save(follow): Observable<Follow> {
    return this.http.post(environment.url + '/follows', JSON.stringify(follow),
      new HttpHeaders({'Content-Type' : 'application/json'})).pipe(map(
      (data: any) => {
        if (data.error) {
          console.error(data.status + ' - ' + data.message);
          return null;
        } else {
          return Follow.fromJson(data);
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


  login(user): Observable<User> {
    return this.http.post(environment.url + '/users/login', JSON.stringify(user),
      new HttpHeaders({'Content-Type' : 'application/json'})).pipe(map(
      (data: any) => {
        if (data.error) {
          console.error(data.status + ' - ' + data.message);
          return null;
        } else {
          return User.fromJson(data);
        }
      }
    ));
  }
}
