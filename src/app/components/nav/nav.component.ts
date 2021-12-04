import { Component, OnInit } from '@angular/core';
import {Router,NavigationEnd} from '@angular/router';

enum mainPage  {
  home =1,
  products =2,
  people=3,
  admin=4
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})



export class NavComponent implements OnInit {
   pageActive : mainPage;
  constructor(private router: Router) { 
    this.router.events.subscribe(x=>{
      if(x instanceof NavigationEnd){
        if(x.url.indexOf("home")>0){
          this.pageActive = mainPage.home;
        }else if(x.url.indexOf("products")>0){
          this.pageActive = mainPage.products;
        }else if(x.url.indexOf("people")>0){
          this.pageActive = mainPage.people;
        }else if(x.url.indexOf("admin")>0){
          this.pageActive = mainPage.admin;
        }else{
          this.pageActive= mainPage.home;
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
