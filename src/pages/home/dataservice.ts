import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class GoogledataService {
 public url='172.20.10.2';
 //public url='localhost';

  constructor(private _http:Http) { }
  search()
  {


     // return this._http.get('http://f079247e.ngrok.io/')
     return this._http.get(`http://${this.url}:3000/`)
      .map((res:Response)=>res.json());


  }
  getApprover(emplid){
    return this._http.get(`http://${this.url}:3000/approver/${emplid}`)
     .map((res:Response)=>res.json());
  }
  getSheetid(){
    return this._http.get(`http://${this.url}:3000/sheetID`)
     .map((res:Response)=>res.json());
  }
  getProject(){
    return this._http.get(`http://${this.url}:3000/project`)
     .map((res:Response)=>res.json());
  }
  getApproverName(emplid){
    return this._http.get(`http://${this.url}:3000/approvername/${emplid}`)
     .map((res:Response)=>res.json());
  }
  cat()
  {
    return this._http.get(`http://${this.url}:3000/btype`)
     .map((res:Response)=>res.json());
  }
  Option(lat,lng,query)
  {
    //return this._http.get('http://f079247e.ngrok.io/fs/'+lat+"/"+lng+"/"+query)
    return this._http.get('http://172.31.98.16:3000/fs/'+lat+"/"+lng+"/"+query)
      .map((res:Response)=>res.json());

  }
}
