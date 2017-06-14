import { Injectable } from '@angular/core';
import { HttpAuthService } from '../login/httpAuth.service';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Template } from './template';
import { Host } from '../../util/host';

const BASE_URL = Host.getURL();
const GET_TEMPLATES_URL = `${BASE_URL}${'email/templates'}`;
const SEND_EMAIL_URL = `${BASE_URL}${'email'}`;

@Injectable()
export class EmailService {
  constructor(private httpAuthService: HttpAuthService) {
  }

  public getTemplates(): Observable<Template[]> {
    return this.httpAuthService.get(GET_TEMPLATES_URL).map((response: Response) => {
      return (<any>response.json()).map((item: any) => {
        const template = new Template();
        template.type = item.type;
        template.body = item.body;
        return template;
      });
    });
  }

  public sendEmail(template: Template, file?: any): Observable<Response> {
    return this.httpAuthService.postMultipart(SEND_EMAIL_URL, JSON.stringify(template), file);
  }

}
