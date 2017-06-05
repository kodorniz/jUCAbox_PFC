import { Injectable } from '@angular/core';


@Injectable()
export class FriendsService {


  constructor() {


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


  public getFriendsUser(userID:string,users:any[]){
    //console.log(this.users);
    let amigos:any[] =  this.friends.filter(
      function(data){
        return data.userID == userID;
      }
    );

    let amigosDatos:any[]=[];

    for (let i=0;i<users.length;i++){

      for (let j=0;j<amigos.length;j++){

        if(amigos[j]['friendID'] == users[i]['user_id']){
          //console.log(amigos[j]);
          amigosDatos.push(users[i]);
        }
      }
    }
    return amigosDatos;
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
