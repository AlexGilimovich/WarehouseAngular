import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestMethod, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';
import { User } from '../user/user';

const HEADER_AUTHORIZATION = 'Authorization';
const HEADER_CONTENT_TYPE = 'Content-type';
const CONTENT_TYPE_JSON = 'application/json';
const CONTENT_MULTIPART = 'multipart/form-data';

@Injectable()
export class HttpAuthService {
  constructor(private _http: Http,
              private loginService: LoginService) {
  }

  private _buildAuthHeader(user: User): string {
    return `${'Basic '}${btoa(`${user.login}${':'}${user.password}`)}`;

  }

  public postMultipart(url: string, body: string, file: any): Observable<Response> {
    return this._multipartRequest(RequestMethod.Post, url, body, file);
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

  private _multipartRequest(method: RequestMethod, url: string, body: string, file: any): Observable<Response> {
    const options = new RequestOptions(new Headers());
    // options.method = method;
    // options.url = url;
    // options.body = body;
    if (!options.headers) {
      options.headers = new Headers();
    }
    options.headers.append(HEADER_AUTHORIZATION, this._buildAuthHeader(this.loginService.getLoggedUser()));
    options.headers.append(HEADER_CONTENT_TYPE, undefined);

    const formData: FormData = new FormData();
    formData.append('template', new Blob([JSON.stringify(body)], {
      type: CONTENT_TYPE_JSON
    }));
    formData.append('image', file, file.name);

    return this._http.post(url, formData, options);
    // this.setUploaderRequestPayload(fileUploader, body);
    // this.setUploaderAuthHeaders(fileUploader);
    // this.setUploaderMethod(fileUploader, method);
    // return Observable.create(observer => {
    //   fileUploader.queue.forEach(item => item.upload());
    //   fileUploader.onCompleteAll = () => {
    //     observer.next();
    //     observer.complete();
    //   };
    //   fileUploader.onErrorItem = () => {
    //     observer.error();
    //     observer.complete();
    //   };
    // });

  }

  // private setUploaderRequestPayload(fileUploader: FileUploader, body: string): void {
  //   fileUploader.onBeforeUploadItem = (fileItem: any) => {
  //     fileItem.formData.push({template: body});
  //   };
  // }
  //
  // private setUploaderMethod(fileUploader: FileUploader, method: RequestMethod): void {
  //   switch (method) {
  //     case 0:
  //       fileUploader.options.method = 'GET';
  //       break;
  //     case 1:
  //       fileUploader.options.method = 'POST';
  //       break;
  //     case 2:
  //       fileUploader.options.method = 'PUT';
  //       break;
  //     case 3:
  //       fileUploader.options.method = 'DELETE';
  //       break;
  //     case 4:
  //       fileUploader.options.method = 'OPTIONS';
  //       break;
  //     case 5:
  //       fileUploader.options.method = 'HEAD';
  //       break;
  //     case 6:
  //       fileUploader.options.method = 'PATCH';
  //       break;
  //     default:
  //       break;
  //   }
  //
  // }

  // private setUploaderAuthHeaders(fileUploader: FileUploader): void {
  //   fileUploader.authToken = this._buildAuthHeader(this.loginService.getLoggedUser());
  // }


}
