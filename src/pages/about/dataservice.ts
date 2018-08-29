import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class GeolocdataService {
public url='172.20.10.2';
  constructor(private _http:Http) { }
  search(id)
  {
//172.31.98.16

    //  return this._http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+add+'&key=AIzaSyAgxFOpvb-XcEmkSOkYAktRYafuUNE1xEw')
     return this._http.get(`http://${this.url}:3000/approverexpense/`+id)
      .map((res:Response)=>res.json());


  }


  search2(user)
  {
//172.31.98.16

    //  return this._http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+add+'&key=AIzaSyAgxFOpvb-XcEmkSOkYAktRYafuUNE1xEw')
     return this._http.get(`http://${this.url}:3000/user/`+user)
      .map((res:Response)=>res.json());


  }
  searchByid(id)
  {
//172.31.98.16
console.log("searchby id");
    //  return this._http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+add+'&key=AIzaSyAgxFOpvb-XcEmkSOkYAktRYafuUNE1xEw')
     return this._http.get(`http://${this.url}:3000/info/${id}`)
      .map((res:Response)=>res.json());


  }
  approve(x,id,com)
  {
    return this._http.get(`http://${this.url}:3000/status/${x}/${id}/${com}`)
     .map((res:Response)=>res.json());

  }
/*options(lat)
{
 // return this._http.get('http://f079247e.ngrok.io/fs2/'+lat+"/"+lng+"/"+query)
    return this._http.get('http://192.168.43.121/img/'+lat,{ responseType: ResponseContentType.Blob })
      .map((res:Response)=>res.blob());
}*/

  /*
  Option(lat,lng,query)
  {
    return this._http.get('http://9ab41128.ngrok.io/fs/'+lat+"/"+lng+"/"+query)
    //return this._http.get('http://192.168.1.103:3000/fs/'+lat+"/"+lng+"/"+query)
      .map((res:Response)=>res.json());

  }*/
}
