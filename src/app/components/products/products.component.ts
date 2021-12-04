import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Urun } from 'src/app/models/urun';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns : string[] = ["id","urunIsim","seriNo","birimFiyati","insan.ad","insan.soyad","action"];
  dataSource;
  products:Urun[];
  constructor(private productService:ProductService) { }
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe(response => {
      this.products = response;
      this.dataSource = new MatTableDataSource<Urun>(response);
    });
  }

  deleteProduct(id:number){
    this.productService.deleteProduct(id).subscribe(response=>{
      let product = this.products.filter(x=>x.id === id)[0];
      let index = this.products.indexOf(product);
      this.products.splice(index,1);

      this.dataSource = new MatTableDataSource<Urun>(this.products);
    })
  }

}
