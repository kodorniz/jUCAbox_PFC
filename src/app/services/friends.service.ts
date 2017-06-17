import { Injectable } from '@angular/core';
import { HttpModule, Http,RequestOptions,Headers,URLSearchParams } from '@angular/http';

@Injectable()
export class FriendsService {


  constructor(private http:Http) {


  }

  private friends:any[]=[{
    friendID: "twitter|153942704",
    userID: "google-oauth2|113690553810319532231"
  },
  {
    friendID: "auth0|59074faa5d4f881ecedb23de",
    userID: "google-oauth2|113690553810319532231"
  },
  {
    friendID: "google-oauth2|113690553810319532231" ,
    userID: "twitter|153942704"
  },
  {
    friendID: "google-oauth2|113690553810319532231",
    userID: "auth0|59074faa5d4f881ecedb23de"
  }];

  public getFriendsUser(userID:string){
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
    let amigos:any[] =  this.friends.filter(
      function(data){
        return data.userID == userID;
      }
    );

    return amigos.length;
  }
}
