import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/share/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CheckoutService } from 'src/app/share/checkout.service';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/share/dialog/dialog.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
 cart;
 products;
 cartItem=[];

  billingForm: FormGroup;
  customError = {status: false, message:''};
  customError2 = {status: false, message:''};
  constructor(
    private dataService:DataService,
    private router:Router,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder,
    private checkoutService:CheckoutService,
    public dialog: MatDialog,
  ) { 
    this.billingForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', [Validators.required,  Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['',Validators.required],
      city: ['', Validators.required],
      subcity: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.dataService.currentCart.subscribe(editCart => (this.cart= editCart));
    console.log('ngOnInit-this.cart--', this.cart);
    if(this.cart){
      this.cartList(this.cart);

      console.log('environment--', environment.api_url);
   }
  }

  get freg() { return this.billingForm.controls; }

  async placeorder(){
    console.log('placeorder');
    if (!this.billingForm.invalid ) { //--Checks form input validity and Password match

      const res = await this.checkoutService.placeorder(this.billingForm.value);
      console.log('res-', res);
      if(res.status === 200){
        //-- success
        this.billingForm.reset();
        let _html=`
            <div class="c-green">
              <div class="material-icons">task_alt</div>
              <h1>Product will be deliverd by Joel</h1>
              <h3>Please login</h3>
            </div>`;
        this.openDialog(_html);

      }else{
        //-- Fail
        this.customError.status = true;
        this.customError.message = res.data.message;
        console.log('this.customError--', this.customError);
      }
    } else {
        //--Form input is not valid
        this.billingForm.markAllAsTouched(); //--Trigger validation across form
        console.log('block submission');
    }
  }


  cartList(items) {
    this.cartItem = [];

    console.log('item--', items.products);

    items.products.forEach ( (item, index) => {
      console.log('item--', item);
       if(index<=0){
         //--first loop
         //--add new
         let tmpData = {
           pId : item.pId,
           qty: 1 ,
           price: item.pPriceSale ? item.pPriceSale: item.pPrice,
           data: item 
         };
         this.cartItem.push(tmpData);
       }else{
         if(this.cartItem[this.cartItem.findIndex(obj => obj.pId === item.pId)]){
           let currentData = this.cartItem[this.cartItem.findIndex(obj => obj.pId === item.pId)];
           currentData.qty = currentData.qty+1;
         }else{
           let tmpData = {
            pId : item.pId,
            qty: 1,
            price: item.pPriceSale ? item.pPriceSale: item.pPrice,
            data: item
           }
           this.cartItem.push(tmpData);
         }
       }
    });
    console.log('cartItem--', this.cartItem);
  }

  minus(product){
    this.add2cart('minus',product);
    this.ngOnInit()
  }
  plus(product){
    this.add2cart('plus',product);
    this.ngOnInit()
  }
  add2cart(type,product){
    if(type === 'plus'){
      this.cart.products.push(product);
      this.cart.cart = this.cart.cart + 1;
      let _price = product.pPriceSale ? product.pPriceSale : product.pPrice;
      this.cart.subTotal = this.cart.subTotal + _price;
      this.cart.grandTotal = this.cart.subTotal + this.cart.shippingCost;


    }else{
      if(this.cart.products.findIndex(obj => obj.pId === product.pId) >= 0){
        let tmpIndex = this.cart.products.findIndex(obj => obj.pId === product.pId);
        this.cart.products.splice(tmpIndex, 1);
        this.cart.cart = this.cart.cart - 1;

        let _price = product.pPriceSale ? product.pPriceSale : product.pPrice;
        this.cart.subTotal = this.cart.subTotal - _price;
        this.cart.grandTotal = this.cart.subTotal + this.cart.shippingCost;
      }
    }
    this.dataService.updateCart(this.cart);

    console.log('this.cart--', this.cart)
  }
  
  openDialog(_html) {
    // console.log('_html-', _html);
    let dialogRef = this.dialog.open(DialogComponent, {
        data: {
          html: _html,
        }
    });
    setTimeout(() => {
      dialogRef.close();
    }, 2000);
  }
}
