import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';
import {GeolocdataService} from '../about/dataservice';
/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
  providers:[GeolocdataService]
})
export class ModalPage {
public msg;
public img;
public mode;
public comments;
public com;
public data;
public url="172.20.10.2";
imageToShow: any;


  constructor(private gloc:GeolocdataService,public navCtrl: NavController,public viewCtrl : ViewController,public navParams: NavParams) {
  }
  public closeModal(){
      this.viewCtrl.dismiss();
  }
  createImageFromBlob(image: Blob) {
     let reader = new FileReader();
     reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
     }, false);

     if (image) {
        reader.readAsDataURL(image);
     }
  }

  ionViewDidLoad() {
    //alert(this.navParams.get('id'));
    this.gloc.searchByid(this.navParams.get('id')).subscribe((d)=>{
      this.data=d;
        //alert(JSON.stringify(this.data));
      //this.msg=`http://${this.url}:3000/sample/${d[0].FileLink}`;
      //console.log(this.msg);
    //  this.mode=this.navParams.get('mode');
    });


  /*  this.img=this.navParams.get('message');
    this.com=this.navParams.get('com');
    //  console.log('ionViewDidLoad ModalPage');
      console.log(this.navParams.get('message'));
      console.log(this.navParams.get('com'));*/

  }
  status(x)
  {
    this.gloc.approve(x,this.data[0]._id,this.comments).subscribe();
    this.viewCtrl.dismiss();
  }

}
