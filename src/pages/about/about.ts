import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GeolocdataService} from './dataservice';
import { ModalController } from 'ionic-angular';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
   providers:[GeolocdataService]
})
export class AboutPage {
public location:string;
public option:string;
public lat;
public long;
public recom;
public user;
public pet: string = "Pending";
  constructor(public navCtrl: NavController,private gloc:GeolocdataService,public modalCtrl : ModalController) {


  }
  ngOnInit() {
    this.gloc.search(localStorage.getItem("e")).subscribe((data)=>{
    /*this.lat=data.results[0].geometry.location.lat;
    this.long=data.results[0].geometry.location.lng;
    this.gloc.options(this.lat,this.long,this.option).subscribe((data)=>{
    console.log(data);*/
    this.recom=data;
  });
    setInterval(()=> {
    this.gloc.search(localStorage.getItem("e")).subscribe((data)=>{
    /*this.lat=data.results[0].geometry.location.lat;
    this.long=data.results[0].geometry.location.lng;
    this.gloc.options(this.lat,this.long,this.option).subscribe((data)=>{
    console.log(data);*/
    this.recom=data;
  });
},4000);
 this.user=localStorage.getItem("user");
  }

Mysearch()
{
console.log(this.location+"   "+this.option);
//alert(this.location+"   "+this.option);

//})





}
public status()
{
//alert(this.pet);
}
public openModal1(l){

var data = { id : l,mode:1};
   var modalPage = this.modalCtrl.create('NModalPage',data);
   modalPage.present();

 }





}
