import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Coordinates, Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import {ActionSheetController, ToastController, LoadingController, Loading } from 'ionic-angular';
 import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import {GoogledataService} from './dataservice';

declare var cordova: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[GoogledataService]
})
export class HomePage {
 location: Coordinates;
  lastImage: string = null;
  loading: Loading;
  fdata;
  expense;
  dateef;
    datesf;
    cat;
    project;
    purpose;

 recom;
 lat;
 lng;
 vflag;
 dflag;
 comments;
 multi;
 sheetid;
 public citem;
 public user;
 public approver;
 public approvername;
 public pitems;
 public ip='172.20.10.2';

  constructor(private gd:GoogledataService,public navCtrl: NavController, private camera: Camera, private transfer: FileTransfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController,public loadingCtrl: LoadingController, private geolocation: Geolocation,private platform: Platform) {

  }
  /*async ngOnInit() {
   await this.platform.ready();
    const { coords } = await this.geolocation.getCurrentPosition();
    this.location = coords;
    this.lat=coords.latitude;
    this.lng=coords.longitude;
    this.gd.cat().subscribe((data)=>{
      this.citem=data;
    });
  //  this.ofetch();
}*/
  ngOnInit() {
    this.gd.cat().subscribe((data)=>{
      this.citem=data;
    });
    this.gd.getApprover(localStorage.getItem("e")).subscribe((data)=>{
      this.approver=data;
      localStorage.setItem("mid", this.approver[0].ManagerId);
      this.gd.getApproverName(this.approver[0].ManagerId).subscribe((data)=>{
        this.approvername=data[0].FirstName+" "+data[0].MiddleName+" "+data[0].LastName;
      });
      this.gd.getSheetid().subscribe((data)=>{
        this.sheetid=data;
      });
    });

    this.gd.getProject().subscribe((data)=>{
      this.pitems=data;
    });


  //  this.citem=["DSL Bill","","3"];
//this.user=localStorage.getItem("user");

  }

  public presentActionSheet() {

if(this.vflag)
{

  let toast = this.toastCtrl.create({
    message: 'Cannot save data entered is incorrect DSL Bill limit is 1200',
    duration: 3000
  });
  toast.present();


}
else if(this.dflag)
{
  let toast = this.toastCtrl.create({
    message: 'Cannot save data entered is incorrect date range more than 3 months',
    duration: 3000
  });
  toast.present();
}
  else{


    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
      /*  {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },*/
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  }

public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 30,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };

  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}

// Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  Math.floor((Math.random() * 100) + 1) + ".jpg";
  return newFileName;
}

// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

public uploadImage() {
  // Destination URL
 //var u='192.168.43.121';
 var u=this.ip;
 this.user=localStorage.getItem("user");
 var url = encodeURI(`http://${u}:3000/upload`);
  // var url = encodeURI("http://f079247e.ngrok.io/upload");
  // File for Upload
  //alert(this.expense);
  var targetPath = this.pathForImage(this.lastImage);
 //alert(targetPath);
  // File name only
  var filename = this.lastImage;
var mid=localStorage.getItem("mid");
var eid=localStorage.getItem("e");
 let options: FileUploadOptions = {
    fileKey: "fileName",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {"fileName": filename,"sdate":this.datesf,"edate":this.dateef,"expense":this.expense,"cat":this.cat,"user":this.user,"comment":this.comments,"multi":this.multi,"sheetid":this.sheetid,"ptype":this.project,"purpose":this.purpose,"managerid":mid,"Eid":eid,"approver":this.approvername}
  };
  /*var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,


  };*/
 //alert(JSON.stringify(options));
 const fileTransfer: FileTransferObject = this.transfer.create();
 // const fileTransfer: TransferObject = this.transfer.create();

  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();

  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast("File upload Successful");
   this.fetch();
 //   this.ofetch();
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  //alert(JSON.stringify(err));
});
}

fetch()
{
  if(!this.multi)
  {
    //this.gd.getSheetid().subscribe((data)=>{
      //this.sheetid=data;
  this.ngOnInit();
    }



/*this.gd.search().subscribe((data)=>{
this.fdata=data;
this.oofetch(this.fdata[0].webDetection.webEntities[0].description);
});
*/
}
ofetch()
{
 // alert(this.lat+"  "+ this.lng+'cake');
this.gd.Option(this.lat,this.lng,'cake').subscribe((data)=>{
this.recom=data.response;

//console.log(JSON.stringify(this.recom,undefined,2));


});

}
oofetch(dd)
{
 // alert(this.lat+"  "+ this.lng+dd);
this.gd.Option(this.lat,this.lng,dd).subscribe((data)=>{
this.recom=data.response;

//console.log(JSON.stringify(this.recom,undefined,2));


});

}
 /* getGeo()
{
 this.platform.ready().then(()=>{
let options = {timeout: 30000, enableHighAccuracy: true, maximumAge: 9600};
this.geolocation.getCurrentPosition(options).then((resp) => {
alert(JSON.stringify(resp));
}).catch((error) => {
alert(JSON.stringify(error));
});
}).catch((er)=>{
alert(JSON.stringify((er)));
});
}*/
 async getLocation() {
    await this.platform.ready();
    const { coords } = await this.geolocation.getCurrentPosition();
    this.location = coords;
  }
public validator()
{
  var past_date = new Date(this.datesf);
var current_date = new Date();
var difference = (current_date.getFullYear()*12 + current_date.getMonth()) - (past_date.getFullYear()*12 + past_date.getMonth());
if(difference>3)
{
  alert("You can't submit expense for date range more than 3 months");
  this.dflag=1;
}
else{
    this.dflag=0;
}

}
public expenseval()
{
//  alert("here");
  if(this.cat==='DSL Bill')
  {

    if(this.expense>1200)
    {
      alert("The maximum limit for DSL expense is 1200");
      this.vflag=1;
    }
    else{
      this.vflag=0;
    }
  }
  else{
    this.vflag=0;
  }
}
}
