import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductlistService } from 'src/app/services/productlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('suggestedProductList') suggestedProductList!: ElementRef;
  productId: any;
  productDetails: any;
  categorynme:any;
  categoryId: any;
  suggestedProductDetails: any;

  constructor(private route: ActivatedRoute, private productlistService: ProductlistService) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.url[1].path;
    this.productId = this.route.snapshot.url[2].path;
    this.getProductDetails(this.productId);
    this.getSuggestedCategoryBasedProducts(this.categoryId);
  }
   
  scrollAmount = 100; 

  scrollLeft() {
    this.suggestedProductList.nativeElement.scrollLeft -= this.scrollAmount;
  }

  scrollRight() {
    this.suggestedProductList.nativeElement.scrollLeft += this.scrollAmount;
  }

  //product specific details
  getProductDetails(productId:any){
    this.productlistService.getProduct(this.productId).subscribe({
      next:(res:any) =>{
        this.productDetails = res.result;
        //console.log(this.productDetails);
      },error:(err) =>{
        console.error('Error fetching product details:', err);
        alert(err.message);
      }
    });
  }
  //get suggested products on productDetails page
  getSuggestedCategoryBasedProducts(categoryId: any){
    this.productlistService.getProductsBasedOnCategories(this.categoryId).subscribe({
      next:(res:any) =>{
        this.suggestedProductDetails = res.result;
        console.log(this.suggestedProductDetails);
      },error: (err) =>{
        console.error('Error fetching suggested product details:', err);
        alert(err.message);
      }
    })
  }
 
}
