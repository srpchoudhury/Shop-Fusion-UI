import { Component, OnInit } from '@angular/core';
import { ProductlistService } from '../productlist.service';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent implements OnInit {

  products: any = [];
  constructor(private productlistService: ProductlistService) { }

  ngOnInit(): void {
    this.productlistService.getProducts().subscribe(products => {
      this.products = Object.values(products.result);
      console.log(this.products);
    
    });
  }

}
