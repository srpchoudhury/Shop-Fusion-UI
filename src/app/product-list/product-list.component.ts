import { Component, OnInit } from '@angular/core';
import { ProductlistService } from '../productlist.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any = [];
  constructor(private productlistService: ProductlistService) { }

  
  ngOnInit(): void {
    
    this.productlistService.getProducts().subscribe(products => {
      this.products = Object.values(products.result);
      console.log(this.products);
    
    });
  }
}
