import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/share/user.service';

// import axios from 'axios';
import axios from "src/utils/axios"

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiURL: string = environment.api_url;
  //apiPath = 'product';

  constructor(
    private userService:UserService,
  ) {}

  //--get all user
  async getAll(){
    try {
      const res = await axios.get(`${this.apiURL}/api/product`);
      console.log('res.data-', res.data);
      return res;
    } catch (error) {
      //console.error(error);
      console.log(error);
    }
  }

  async getOne(id){
    try {
      const res = await axios.get(`${this.apiURL}/api/product/${id}`);
      // console.log('res.data-', res);
      return res;
    } catch (error) {
      // console.error(error);
      console.log(error);
    }
  }

  async uploadMulti(payload){
    try {
      const res = await axios.post(`${this.apiURL}/uploadmultiple`, payload);
      console.log('res-', res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async create(payload){
    try {
      const res = await axios({
          method: "post",
          url: `${this.apiURL}/api/product`,
          data: payload
      });

      // console.log('res-', res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async update(payload, id){
    console.log('payload-', payload);
    // return;

    try {
      const res = await axios({
          method: "put",
          url: `${this.apiURL}/api/product/${id}`,
          data: payload,
      });

      // console.log('res-', res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteImage(img, id){
      try {
        const res = await axios({
          method: "get",
          url: `${this.apiURL}/api/product/image/${id}/${img.name}`,
        });
        console.log('res-', res);
        return res;
      } catch (error) {
        // console.error(error);
        console.log(error);
      }
  }

  async delete(id){
    try {
      const res = await axios({
        method: "delete",
        url: `${this.apiURL}/api/product/${id}`,
      });
      console.log('res-', res);
      return res;
    } catch (error) {
      // console.error(error);
      console.log(error);
    }
  }

}
