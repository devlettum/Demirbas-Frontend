import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Insan } from 'src/app/models/insan';
import { Urun } from 'src/app/models/urun';
import { PeopleService } from 'src/app/services/people.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private peopleService : PeopleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  people: Insan[];
  productId: number;
  productForm: FormGroup;
  adSoyad;

  ngOnInit(): void {
    this.getInsan();
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.productService.getProduct(this.productId).subscribe(response => {
      this.getControls['urunIsim'].setValue(response.urunIsim);
      this.getControls['seriNo'].setValue(response.seriNo);
      this.getControls['birimFiyati'].setValue(response.birimFiyati);
      this.getControls['insan'].setValue(response.insan);
    });

    this.productForm = new FormGroup({
      urunIsim: new FormControl(""),
      seriNo: new FormControl(""),
      birimFiyati: new FormControl(""),
      insan: new FormControl(""),
    });
  }

  get getControls() {
    return this.productForm.controls;
  }
  getInsan(){
    this.peopleService.getPeople().subscribe(response=>{
      this.people=response;
    });
  }

  insanAdSoyadGoruntule(insan:Insan) {
    return insan.ad +" "+ insan.soyad;
  }

  onSubmit() {
    this.productService
      .updateProduct(this.productForm.value)
      .subscribe(result => {
        this.router.navigateByUrl('/products');
      });
  }
}
