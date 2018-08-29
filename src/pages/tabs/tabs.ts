import { Component,OnInit } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {GeolocdataService} from '../login/dataservice';

@Component({
  templateUrl: 'tabs.html',
  providers:[GeolocdataService]
})
export class TabsPage implements OnInit {
// tabRoot = LoginPage;
public flag;
constructor(private gloc:GeolocdataService) {
}
ngOnInit() {
   //this.gloc.currentMessage.subscribe(message => this.message = message);
  // this.gloc.getData.subscribe(message=>this.message=message);
  //this.flag=localStorage.getItem("admin");
  //alert(this.flag);

  this.gloc.getadmin(localStorage.getItem("e")).subscribe((d)=>{
    this.flag=d;

  })
 }
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

}
