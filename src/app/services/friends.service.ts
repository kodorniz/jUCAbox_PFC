import { Injectable } from '@angular/core';
import { HttpModule, Http,RequestOptions,Headers,URLSearchParams } from '@angular/http';

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
