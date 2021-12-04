import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urun } from '../models/urun';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'https://localhost:44342/api/';
  constructor(private httpClient: HttpClient) { }

  getProducts()  {
    let newPath : string = this.apiUrl + 'uruns';
    return this.httpClient.get<Urun[]>(newPath);
  }

  deleteProduct(id:number) {
    let newPath : string = this.apiUrl + 'uruns/' + id;
    return this.httpClient.delete(newPath);
  }


  updateProduct(product:Urun){
    let newPath : string = this.apiUrl + 'uruns/'+product.id;
    return this.httpClient.put<any>(newPath, product);
  }

  getProduct(id:number){
    let newPath : string = this.apiUrl + 'uruns/' + id;
    return this.httpClient.get<Urun>(newPath);
  }
  addProduct(product:Urun){
    let newPath : string = this.apiUrl + 'uruns/';
    return this.httpClient.post<any>(newPath, product);
  }



}
