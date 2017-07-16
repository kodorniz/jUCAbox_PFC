import { Injectable } from '@angular/core';
import { JucaboxService } from '../services/jucabox.service';
import { HttpModule, Http,RequestOptions,Headers,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ArtistasService {

  constructor(private http:Http,private _jucaboxService:JucaboxService) { }
  private artistasFav:any[]=[];


  public getArtistasFav(userID:string){

    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers();
    headers.append('Authorization', authToken);

    let query =  userID;
    let url = '/api/getArtistasFav/' + userID;

    return this.http.get(url,{headers})
            .map( res =>{
              //  console.log(res.json());
              //  this.artistas =  res.json().artists.items;

                return res.json();



            }).catch(this.handleError);

  }

  /*public getArtistasFav(userID: string){
    if(userID != undefined){
    this.initArtistasFav(userID).subscribe(
      data=>{
        console.log(data);
        let artistasTotal:any[]=[];
        for (var _i = 0; _i < data.artistasFav.length; _i++){

          if(data.artistaFav[_i].userID == userID){
          this._jucaboxService.getArtista(data.artistasFav[_i].artistaID).subscribe(data =>{

             artistasTotal.push(data);
           });
         }

        }
        return artistasTotal;
      }

    )}

    return [];

  }*/
  /*public countArtistasFav(userID:string){
    let count:any[];
if(userID != undefined){
    this.getArtistasFav(userID).subscribe(
      data=>{
        return data.artistasFav.length;
      }
    );
  }
    return 0;
  }*/

  getFav(id:string,userID:string){
    //return this.lugaresFav.filter(
    //  function(data){ return data.id === id && data.globalClientID === GlobalClientID }
    //)[0];
    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers();
    headers.append('Authorization', authToken);

    let query =  userID;
    let url = '/api/getArtistaFav/' + userID + '/' + id;

    return this.http.get(url,{headers})
            .map( res =>{
              //  console.log(res.json());
              //  this.artistas =  res.json().artists.items;

                return res.json();

            }).catch(this.handleError);

}

  public addFav(artistaID:string,artistaName:string,generos_artista:any,userID:string){

    let authToken = localStorage.getItem('tokenJB');

    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', authToken);

    let options = new RequestOptions({ headers: headers });
    let objeto = {"artistaID": artistaID, "userID": userID,"artistaName": artistaName,"generos_artista":generos_artista};

    return this.http
      .post('/api/addArtistaFav',objeto,options)
      .map(res => {
        return res.json();
      }
    ).catch(this.handleError);


  /*  this.artistasFav.push(
      {
        artistaID: artistaID,
        userID: userID
      });*/

  }

  public removeFav(artistaID:string,userID: string){
    let authToken = localStorage.getItem('tokenJB');


    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', authToken);
    let objeto = {"artistaID": artistaID,"userID": userID };
    let options = new RequestOptions({ headers: headers , body: objeto});


    return this.http
      .delete(  '/api/deleteArtistaFav',options)
      .map(res => {
        return res.json();
      }
    ).catch(this.handleError);


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

}
