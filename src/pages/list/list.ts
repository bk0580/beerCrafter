import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';

import { DetailsPage } from '../details/details';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  crafts: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, menu: MenuController, public dataProvider: DataProvider, public events: Events) {
    menu.enable(true); 

    this.update();

    this.events.subscribe('storage:changed', () => {
      this.update();
    });
  }

  update() {
    this.dataProvider.getList( (crafts) => {
      this.crafts=crafts;
      this.checkEmptyList();
      console.log('--== updated ==--');
    });
  }

  goDetails(id, edit) {
    let craft={};

    this.crafts.forEach(element => {
      if(element.id==id) {
        craft=element;
        return false;
      }
    });

    this.navCtrl.push(DetailsPage, {craft: craft, edit: edit});
  }

  goEdit(id) {
    this.goDetails(id, true);
  }

  checkEmptyList() {
    if(this.crafts.length==0) {
      this.goEdit(0);
    }
  }
}
