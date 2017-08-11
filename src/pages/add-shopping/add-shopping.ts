import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { ShoppingItem } from './../../models/shopping-item/shopping-item.interface';

/**
 * Generated class for the AddShoppingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  // Create a new object
  shoppingItem = {} as ShoppingItem;
  ShoppingItemRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.ShoppingItemRef$ = this.database.list('shopping-list');

    /**
     * shoppingList:
     *  0:
     *    itemName: 'Pizza',
     *    itemNumber: 5
     *  1:
     *    itemName: 'Cheesecake',
     *    itemNumber: 2
     *    
     */
  }

  addShoppingItem(shoppingItem: ShoppingItem) {
    // temporarily log it to file
    //console.log(shoppingItem);
    
    // cast the string to a number
    // push is to the firebase DB
    this.ShoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });

    // Reset the ShoppingItem
    this.shoppingItem = {} as ShoppingItem;

    // Navigate the user back to the shoppinglist page
    this.navCtrl.pop();
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad AddShoppingPage');
  }*/

}
