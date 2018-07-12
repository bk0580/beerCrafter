import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, App, Events } from 'ionic-angular';
import { EditComponent } from '../../components/edit/edit';
import { DataProvider } from '../../providers/data/data';
import { ListPage } from '../../pages/list/list';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  craft: any;
  rootPage:any = ListPage;

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertController: AlertController, public dataProvider: DataProvider, public events: Events) {
    this.craft={};

    this.events.subscribe('storage:changed', () => {
      this.update();
    });
  }

  ionViewDidLoad() {
    this.craft=this.navParams.get('craft');

    if(this.navParams.get('edit')===true) {
      this.openEdit();
    }

    this.update();
  }

  update() {
    console.log('details update');
    if(typeof(this.craft) != 'undefined' && typeof(this.craft.id) != 'undefined') {
      this.dataProvider.get(this.craft.id, (craft) => {
        this.craft=craft;
      });
    }
  }

  openEdit() {
    let modal = this.modalCtrl.create(EditComponent, {craft: this.craft});
    modal.present();
  }

  openDelete() {
    const alert = this.alertController.create({
      title: 'Czy na pewno usunąć?',
      subTitle: this.craft.name,
      buttons: [
        {
          text: 'Anuluj'
        },
        {
          text: 'Usuń',
          handler: data => {
            this.dataProvider.delete(this.craft.id, () => {
              this.app.getRootNavs()[0].pop(this.rootPage);
            });            
          }
        }
      ]
    });
    alert.present();
  }
}
