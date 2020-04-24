import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpUtil {

  httpOptions = {
    withCredentials: false,
    headers: new HttpHeaders({
    })
  };

  constructor(private http: HttpClient, private router: Router) {
    this.httpOptions.headers.append('X-Powered-By', 'Express');
    this.httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    this.httpOptions.headers.append('Content-Type',  'application/json; charset=utf-8');
    this.httpOptions.headers.append('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    this.httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    this.httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    this.httpOptions.headers.append('User-Agent', 'fakeTwitter');
    this.httpOptions.headers.append('Connection', 'MyToken');
    this.httpOptions.headers.append('Accept', '*/*');
  }

  callError(observable) {
    /*observable.catch(
      error => {
        console.error(error);
        return observable;
      }
    )*/
    return observable;
  }

  post(url: string, body: any, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.post(url, body, {headers}));
  }

  get(url: string, headers?: HttpHeaders): Observable<Response> {
    //return this.callError(this.http.get(url, this.httpOptions));
    return this.callError(this.http.get(url, {withCredentials: false, headers}));
  }

  put(url: string, body: any, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.put(url, body, {withCredentials: false, headers}));
  }

  delete(url: string, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.delete(url, {withCredentials: false, headers}));
  }

  patch(url: string, body: any, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.patch(url, body, {withCredentials: false, headers}));
  }

  head(url: string, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.head(url, {withCredentials: false, headers}));
  }

  options(url: string, headers?: HttpHeaders): Observable<Response> {
    return this.callError(this.http.options(url, {withCredentials: false, headers}));
  }
}
