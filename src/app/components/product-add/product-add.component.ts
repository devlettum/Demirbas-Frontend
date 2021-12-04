import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Insan } from 'src/app/models/insan';
import { PeopleService } from 'src/app/services/people.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  people:Insan[];
  productForm:FormGroup;
  constructor(
    private productService: ProductService,
    private peopleService : PeopleService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getPeople();
    this.productForm = new FormGroup({
      urunIsim: new FormControl(""),
      seriNo: new FormControl(""),
      birimFiyati: new FormControl(""),
      insan: new FormControl(""),
    });
  }

  onSubmit(){
    this.productService.addProduct(this.productForm.value).subscribe(response => {
      this.router.navigateByUrl("/products");
    })
  }
  get getControls(){
    return this.productForm.controls;
  }

  getPeople(){
    this.peopleService.getPeople().subscribe(response=>{
      this.people = response;
    })
  }
  InsanAdSoyadGoruntule(insan:Insan){
    return insan.ad + "" + insan.soyad;
  }

}
