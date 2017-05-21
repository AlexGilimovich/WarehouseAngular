import {Injectable} from "@angular/core";
import {HttpAuthService} from "../login/httpAuth.service";
import {Response, Headers, RequestOptions} from "@angular/http";
import {Observable, Subject} from "rxjs";
import {Act} from "./act";
import {User} from "../user/user";
import {ActType} from "./actType";
import {ActTypeName} from "./actTypeName";
import {ActSearchDTO} from "./actSearchDTO";

const LIST_URL:string = "http://localhost:8080/web/web/act";
const GET_URL:string = "http://localhost:8080/web/web/act/";
const SAVE_URL:string = "http://localhost:8080/web/web/act/save";
const GET_ACTS_FOR_GOODS_URL:string = "http://localhost:8080/web/web/act/acts";
const GET_ACTS_TYPES_URL:string = "http://localhost:8080/web/web/act/acts";
const SEARCH_URL:string = "http://localhost:8080/web/web/act/search";

@Injectable()
export class ActService {
  private searchSource = new Subject<ActSearchDTO>();

  constructor(private httpAuthService:HttpAuthService) {
  }



  list(page:number, count:number):Observable<any> {
    const url:string = `${LIST_URL}${"?page="}${page}${"&count="}${count}`;
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response:Response)=> {
      let count:string = response.headers.get("x-total-count");
      return {
        acts: (<any>response.json()).map(
          item=> {
            let act = new Act();
            act.id = item.id;
            act.date = item.date;
            let user = new User();
            user.id = item.user.id;
            user.lastName = item.user.lastName;
            user.firstName = item.user.firstName;
            user.patronymic = item.user.patronymic;
            act.user = user;
            act.actType = new ActType(null, item.type)
            return act;
          }
        ),
        count: count
      }
    });
  }


  get(id:number):Observable<Act> {
    const url = `${GET_URL}${id}`;
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response:Response) => {
      const item = response.json();
      let act = new Act();
      act.id = item.id;
      act.date = item.date;
      let user = new User();
      user.id = item.user.id;
      user.lastName = item.user.lastName;
      user.firstName = item.user.firstName;
      user.patronymic = item.user.patronymic;
      act.user = user;
      act.actType = new ActType(null, item.type)
      return act;
    })
  }

  save(act:Act) {

  }

  public getActsForGoods(goodsId):Observable<Act[]> {
    const url:string = `${GET_ACTS_FOR_GOODS_URL}${"/"}${goodsId}`;
    return this.httpAuthService.get(url).map((response:Response) => {
      return response.json().map(
        item => {
          let act = new Act();
          act.id = item.id;
          act.date = item.date;
          let user = new User();
          user.id = item.user.id;
          user.lastName = item.user.lastName;
          user.firstName = item.user.firstName;
          user.patronymic = item.user.patronymic;
          act.user = user;
          act.actType = new ActType(null, item.type)
          return act;
        }
      )
    })
  }

  getActTypes():Observable<ActTypeName[]> {
    return this.httpAuthService.get(GET_ACTS_TYPES_URL).map((response:Response) => {
      return response.json().map(
        item => {
          return new ActTypeName(item.id, item.name);
        }
      )
    })
  }


  search(dto:ActSearchDTO, page:number, count:number):Observable<any> {
    const url:string = `${SEARCH_URL}${"/"}${"?page="}${page}${"&count="}${count}`;
    return this.httpAuthService.post(url, JSON.stringify(dto)).map((response:Response)=> {
      let count:string = response.headers.get("x-total-count");
      return {
        acts: (<any>response.json()).map(
          item=> {
            let act = new Act();
            act.id = item.id;
            act.date = item.date;
            let user = new User();
            user.id = item.user.id;
            user.lastName = item.user.lastName;
            user.firstName = item.user.firstName;
            user.patronymic = item.user.patronymic;
            act.user = user;
            act.actType = new ActType(null, item.type)
            return act;
          }),
        count: count
      }
    });

  }
}
