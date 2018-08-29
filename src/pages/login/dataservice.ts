import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
@Injectable()
export class GeolocdataService {
public url='172.20.10.2';
//public url='localhost';

  constructor(private _http:Http) { }
  private messageSource = new BehaviorSubject<string>("default message");
    currentMessage = this.messageSource.asObservable();
    changeMessage(message: string) {
        this.messageSource.next(message)
      }
      private data;

  getuser(username,password){
    return this._http.get(`http://${this.url}:3000/auth/${username}/${password}`)
     .map((res:Response)=>res.json());
  }
  getadmin(emplid){
    return this._http.get(`http://${this.url}:3000/admin/${emplid}`)
     .map((res:Response)=>res.json());
  }

  getData(){
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }


  search(add)
  {


      return this._http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+add+'&key=AIzaSyAgxFOpvb-XcEmkSOkYAktRYafuUNE1xEw')
     //return this._http.get('http://192.168.1.103:3000/')
      .map((res:Response)=>res.json());


  }
options(lat,lng,query)
{
 // return this._http.get('http://f079247e.ngrok.io/fs2/'+lat+"/"+lng+"/"+query)
    return this._http.get('http://172.31.98.18:3000/fs2/'+lat+"/"+lng+"/"+query)
      .map((res:Response)=>res.json());
}

  /*
  Option(lat,lng,query)
  {
    return this._http.get('http://9ab41128.ngrok.io/fs/'+lat+"/"+lng+"/"+query)
    //return this._http.get('http://192.168.1.103:3000/fs/'+lat+"/"+lng+"/"+query)
      .map((res:Response)=>res.json());

  }*/
}
