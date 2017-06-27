import { Injectable } from '@angular/core';
import { HttpModule, Http,RequestOptions,Headers,URLSearchParams } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class FriendsService {


  constructor(private http:Http) {


  }

  private friends:any[]=[];

  public getFriendsUser(userID:string){
    if(userID != undefined){
    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers();
    headers.append('Authorization', authToken);

    let query =  userID;
    let url = '/api/getFriends/' + userID;

    return this.http.get(url,{headers})
            .map( res =>{
              //  console.log(res.json());
              //  this.artistas =  res.json().artists.items;

                return res.json();

            })
    }
  }

  public getFriendRelation(userID:string,friendID:string){
    if(userID != undefined){
    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers();
    headers.append('Authorization', authToken);

    let query =  userID;
    let url = '/api/getFriendsRelation/' + userID + '/' + friendID;

    return this.http.get(url,{headers})
            .map( res =>{
              //  console.log(res.json());
              //  this.artistas =  res.json().artists.items;

                return res.json();

            })
    }
  }

  public addFriend(userID:string,friendID:string){
    let authToken = localStorage.getItem('tokenJB');

    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', authToken);

    let options = new RequestOptions({ headers: headers });
    let objeto = {"userID": userID,"friendID": friendID};
    console.log(objeto);
    return this.http
      .post('/api/addFriend',objeto,options)
      .map(res => {
        return res.json();
      }
    ).catch(this.handleError);
  }


  removeFriend(userID:string,friendID:string){

    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', authToken);
    let objeto = {"friendID": friendID,"userID": userID};
    let options = new RequestOptions({ headers: headers , body: objeto});


    return this.http
      .delete(  '/api/deleteFriend',options)
      .map(res => {
        console.log(res);
        return res.json();
      }
    ).catch(this.handleError);

    //this.lugaresFav.pop(this.getLugar(lugarID));
  }

  private handleError (error: Response | any) {
      // In a real world app, you might use a remote logging infrastructure
      console.log(Response);
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body['error'] || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
    }

  /*public countFriendsDB(userID:string){
    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers();
    headers.append('Authorization', authToken);

    let query =  userID;
    let url = '/api/getFriends/' + userID;

    return this.http.get(url,{headers})
            .map( res =>{
              //  console.log(res.json());
              //  this.artistas =  res.json().artists.items;

                return res.json();

            })
  }


  public countFriends(userID:string){
    if(userID != undefined){
      this.countFriendsDB(userID).subscribe(
      data=> {
        return data.friends.length;
      }
    )
  }

    return 0;
  }*/
}
