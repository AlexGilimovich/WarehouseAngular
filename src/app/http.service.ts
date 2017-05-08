/**
 * Created by Lenovo on 23.04.2017.
 */

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';  // we need to import this now

@Injectable()
export class HttpService{

  constructor(private http: Http){ }

  getData(){
    this.http.get('user.json').map(data => {
      data.json();
      console.log("I CAN SEE DATA HERE: ", data.json());
    });
    return this.http.get('user.json');
  }
}
