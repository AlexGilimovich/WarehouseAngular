import { Inject, Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions, RequestMethod, Request} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {LoginService} from "./login.service";
import {User} from "../user/user";


@Injectable()
export class HttpAuthService {
  constructor(private _http:Http,
              private loginService:LoginService) {
  }

  private _buildAuthHeader(user:User):string {
    return `${"Basic "}${btoa(`${user.login}${":"}${user.password}`)}`;

  }

  public get(url:string, options?:RequestOptions):Observable<Response> {
    return this._request(RequestMethod.Get, url, null, options);
  }

  public post(url:string, body:string, options?:RequestOptions):Observable<Response> {
    return this._request(RequestMethod.Post, url, body, options);
  }

  public put(url:string, body?:string, options?:RequestOptions):Observable<Response> {
    return this._request(RequestMethod.Put, url, body, options);
  }

  public delete(url:string, options?:RequestOptions):Observable<Response> {
    return this._request(RequestMethod.Delete, url, null, options);
  }

  public patch(url:string, body:string, options?:RequestOptions):Observable<Response> {
    return this._request(RequestMethod.Patch, url, body, options);
  }

  public head(url:string, options?:RequestOptions):Observable<Response> {
    return this._request(RequestMethod.Head, url, null, options);
  }

  private _request(method:RequestMethod, url:string, body?:string, _options?:RequestOptions):Observable<Response> {
    let options = _options;
    if (!options)
      options = new RequestOptions(new Headers());
    options.method = method;
    options.url = url;
    options.body = body;
    if (!options.headers) {
      options.headers = new Headers();
    }

    options.headers.append("Authorization", this._buildAuthHeader(this.loginService.getLoggedUser()));
    options.headers.append("Content-type", "application/json");
    return this._http.request(new Request(options));
  }


}
