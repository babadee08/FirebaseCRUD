import { ShoppingItem } from './../../models/shopping-item/shopping-item.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

import { Subscription } from 'rxjs/Subscription'

/**
 * Generated class for the EditShoppingItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemSubscription: Subscription;
  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;

  constructor(public navCtrl: NavController, public navParams: NavParams, private databse: AngularFireDatabase) {
    
    // capture the shoppingItemId as a NavParameter
    const shoppingItemId = this.navParams.get('shoppingItemId');

    //console.log(shoppingItemId);

    // Set the scope of the Firebase object to that of the selected Item
    this.shoppingItemRef$ = this.databse.object(`shopping-list/${shoppingItemId}`);

    // Subscribe to the object and assign it to this.shoppingItem
    this.shoppingItemSubscription = this.shoppingItemRef$.subscribe(shoppingItem => this.shoppingItem = shoppingItem )
  }

  editShoppingItem(shoppingItem: ShoppingItem) {
    // update firebase node with new item data
    this.shoppingItemRef$.update(shoppingItem);

    //go back to the previous page
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    // unsubscribe from the observable when leaving the page
    this.shoppingItemSubscription.unsubscribe();
  }

}
