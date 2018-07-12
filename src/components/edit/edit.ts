import { Component } from '@angular/core';
import { ViewController, NavParams, NavController, App } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ListPage } from '../../pages/list/list';
/**
 * Generated class for the EditComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

 @Component({
  selector: 'edit',
  templateUrl: 'edit.html'
})
export class EditComponent {
  craft: any;
  rootPage:any = ListPage;

  constructor(public viewController: ViewController, public navParams: NavParams, public navCtrl: NavController, public app: App, public dataProvider: DataProvider) {
    this.craft={id: 0};
  }

  ionViewDidLoad() {
    this.craft=this.navParams.get('craft');
  }

  close() {
    this.viewController.dismiss();
    
    if(typeof(this.craft.id)=='undefined') {
      this.app.getRootNavs()[0].pop(this.rootPage);      
    }
  }

  save() {
    this.dataProvider.save(this.craft, () => {});
  }
}
