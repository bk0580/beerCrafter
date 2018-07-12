import { Injectable } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { Events } from 'ionic-angular';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  constructor(public storage: Storage, public events: Events) {  }

  getList(callback) {
    this.storage.get('crafts').then((crafts) => {
      if(crafts == null) {
        crafts = [];
      }
      callback(crafts);
    });
  };

  get(id, callback) {
    this.storage.get('crafts').then((crafts) => {
      if(crafts == null) {
        crafts = [];
      }

      var craft=crafts.find(x => x.id == id);

      if(typeof(craft) == 'undefined') {
        craft = {};
      }
      
      callback(craft);
    });
  };

  save(new_craft, callback) {
    this.getList(( crafts ) => {      
      let max_id=0;
      let added=false;

      for(var i = 0; i < crafts.length; i++) {
        if(new_craft.id == crafts[i].id) {
          crafts[i]=new_craft;
          added=true;
        }

        if(crafts[i].id>max_id) {
          max_id=crafts[i].id;
        }
      }
      
      if(!added) {
        new_craft.id=max_id+1;

        crafts.unshift(new_craft);
      }

      console.log('crafts', crafts);
      this.storage.set('crafts', crafts).then(() => {
        callback();

        this.events.publish('storage:changed');
      });
    });
  };

  delete(id, callback) {
    this.getList(( crafts ) => {
      var index = crafts.findIndex(x => x.id == id);

      if(index > -1) {
        crafts.splice(index, 1);
      }

      this.storage.set('crafts', crafts).then(() => {
        callback();

        this.events.publish('storage:changed');
      });
    });
  }
}
