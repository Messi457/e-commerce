import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
//import axios from 'axios';
import axios from "src/utils/axios"
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  apiURL: string = environment.api_url;

  constructor() { }

  async placeorder(payload){
    //--add username and role
    payload.username = payload.email; //--we will using email for username
     //--defaul set to user role
    try {
      const res = await axios.post(`${this.apiURL}/checkouts`, payload);
      console.log('res-', res);
      if(res){
        return res;
      }
    } catch (error) {
      console.log(error);
      // console.error(error);
    }
  }
}