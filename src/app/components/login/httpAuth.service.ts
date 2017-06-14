import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestMethod, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';
import { User } from '../user/user';
import { UploadItem } from 'angular2-http-file-upload';
import { Uploader } from 'angular2-http-file-upload';


const HEADER_AUTHORIZATION = 'Authorization';
const HEADER_CONTENT_TYPE = 'Content-type';
const CONTENT_TYPE_JSON = 'application/json';
const CONTENT_TYPE_MULTIPART = 'multipart/form-data';
const CONTENT_TYPE_FORM_URLENCODED = 'application/x-www-form-urlencoded';
const CONTENT_TYPE_MULTIPART_MIXED = 'multipart/mixed';

@Injectable()
export class HttpAuthService {
  constructor(private uploadService: Uploader,
              private _http: Http,
              private loginService: LoginService) {
  }

  private _buildAuthHeader(user: User): string {
    return `${'Basic '}${btoa(`${user.login}${':'}${user.password}`)}`;

  }

  public postMultipart(url: string, body: string, file?: any): Observable<Response> {
    return this._multipartRequest(url, body, file);
  }

  public get(url: string, options?: RequestOptions): Observable<Response> {
    return this._request(RequestMethod.Get, url, null, options);
  }

  public post(url: string, body: string, options?: RequestOptions): Observable<Response> {
    return this._request(RequestMethod.Post, url, body, options);
  }

  public put(url: string, body?: string, options?: RequestOptions): Observable<Response> {
    return this._request(RequestMethod.Put, url, body, options);
  }

  public delete(url: string, options?: RequestOptions): Observable<Response> {
    return this._request(RequestMethod.Delete, url, null, options);
  }

  public patch(url: string, body: string, options?: RequestOptions): Observable<Response> {
    return this._request(RequestMethod.Patch, url, body, options);
  }

  public head(url: string, options?: RequestOptions): Observable<Response> {
    return this._request(RequestMethod.Head, url, null, options);
  }

  private _request(method: RequestMethod, url: string, body?: string, _options?: RequestOptions): Observable<Response> {
    let options = _options;
    if (!options) {
      options = new RequestOptions(new Headers());
    }
    options.method = method;
    options.url = url;
    options.body = body;
    if (!options.headers) {
      options.headers = new Headers();
    }
    options.headers.append(HEADER_AUTHORIZATION, this._buildAuthHeader(this.loginService.getLoggedUser()));
    options.headers.append(HEADER_CONTENT_TYPE, CONTENT_TYPE_JSON);
    return this._http.request(new Request(options));
  }

  private _multipartRequest(url: string, body: string, file?: any): any {
    const item: UploadItem = this.getUploadItem(body, url, file);
    this.uploadService.onCompleteUpload = (i, response, status, headers) => {
      return response;
    };
    this.uploadService.onErrorUpload = (i, response, status, headers) => {
      return response;
    };
    this.uploadService.upload(item);
  }

  private getUploadItem(body: string, url: string, file?: any): UploadItem {
    const uploadItem = new UploadItem();
    uploadItem.url = url;
    uploadItem.headers = {Authorization: this._buildAuthHeader(this.loginService.getLoggedUser())};
    if (file) {
      uploadItem.file = file;
      uploadItem.alias = 'image';
    }
    uploadItem.formData = {template: new Blob([JSON.stringify(body)], {type: CONTENT_TYPE_JSON})};
    return uploadItem;
  }
}
