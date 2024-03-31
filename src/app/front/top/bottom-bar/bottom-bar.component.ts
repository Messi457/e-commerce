import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/share/data.service';
//import { DataService } from '../../share/data.service'
@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {
  cart:any;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
   // this.dataService.updateCart("1");
    
    this.dataService.currentCart.subscribe(editcart =>
      (this.cart = editcart));
  }

}
