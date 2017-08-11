import { EditShoppingItemPage } from './../edit-shopping-item/edit-shopping-item';
import { ShoppingItem } from './../../models/shopping-item/shopping-item.interface';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddShoppingPage } from './../add-shopping/add-shopping';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private database: AngularFireDatabase, 
    private actionSheetCtrl: ActionSheetController) {

    // Pointing shoppingListRef$ at firebase -> 'shopping-list' node 
    this.shoppingListRef$ = this.database.list('shopping-list');

    //this.shoppingListRef$.subscribe()
  }

  navigateToAddShoppingPage(): void {
    // navigate user to add shopping page
    //lazy loading version
    //this.navCtrl.push('AddShoppingPage');
    //non lazy loading version
    this.navCtrl.push(AddShoppingPage);
  }

  /*
    Display an actionsheet that gives user the following options

    1. Edit the ShoppingItem
    2. Delete the Item
    3. Cancel selection
  */
  selectShoppingItem(shoppingItem: ShoppingItem) {

    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            // Send the user to the editItemPage and pass key as Parameter
            this.navCtrl.push(EditShoppingItemPage, {
              shoppingItemId: shoppingItem.$key
            });
          }
        }, {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            // Delete the current item
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('The user has selected a cancel button')
          }
        }

      ]
    }).present();
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }*/

}
