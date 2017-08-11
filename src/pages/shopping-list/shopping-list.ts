import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navigateToAddShoppingPage(): void {
    // navigate user to add shopping page
    //lazy loading version
    //this.navCtrl.push('AddShoppingPage');
    //non lazy loading version
    this.navCtrl.push(AddShoppingPage);
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }*/

}
