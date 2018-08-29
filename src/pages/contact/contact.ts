import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GeolocdataService} from '../about/dataservice';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[GeolocdataService]
})
export class ContactPage {
public recom;
public user;
public eid;
public pet: string = "Pending";
  constructor(public navCtrl: NavController,private gloc:GeolocdataService,public modalCtrl : ModalController) {

  }
  ngOnInit() {
    this.user=localStorage.getItem("user");
    this.eid=localStorage.getItem("e");
    setInterval(()=> {
    this.gloc.search2(localStorage.getItem("e")).subscribe((data)=>{
    /*this.lat=data.results[0].geometry.location.lat;
    this.long=data.results[0].geometry.location.lng;
    this.gloc.options(this.lat,this.long,this.option).subscribe((data)=>{
    console.log(data);*/
    this.recom=data;
  });
},4000);
  // this.user=localStorage.getItem("user");
  }
  public status()
  {
  //alert(this.pet);
  }

  public openModal2(l){

  var data = { id:l,mode:2};
     var modalPage = this.modalCtrl.create('ModalPage',data);
     modalPage.present();

   }


}
