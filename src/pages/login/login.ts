import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GeolocdataService} from './dataservice';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'page-about',
  templateUrl: 'login.html',
   providers:[GeolocdataService]
})
export class LoginPage {
public location:string;
public option:string;
public lat;
public long;
public recom;
public UserName;
public Password;
  constructor(public navCtrl: NavController,private gloc:GeolocdataService) {

  }

Mysearch()
{
/*console.log(this.location+"   "+this.option);
//alert(this.location+"   "+this.option);
this.gloc.search(this.location).subscribe((data)=>{
this.lat=data.results[0].geometry.location.lat;
this.long=data.results[0].geometry.location.lng;
this.gloc.options(this.lat,this.long,this.option).subscribe((data)=>{
console.log(data);
this.recom=data.response;

})

})*/
//if(this.UserName=="admin")
//{
//  this.gloc.currentMessage.subscribe(message => this.message = this.UserName);

this.gloc.getuser(this.UserName,this.Password).subscribe((data)=>{
if(data.value)
{
  localStorage.setItem("user", this.UserName);
localStorage.setItem("e",data.EmployeeId);
console.log(data.EmployeeId);
this.navCtrl.push(TabsPage);


}
else{
  alert("Invalid Username/Password");
}

})
//this.gloc.getApprover(this.)

//localStorage.setItem("user", this.UserName);
  // this.gloc.setData(this.UserName);
//}







}



}
