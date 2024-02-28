export class User {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
  
    constructor(id: string, email: string, name: string, phoneNumber: string) {
      this.id = id;
      this.email = email;
      this.name = name;
      this.phoneNumber = phoneNumber;
    }
}
export interface productType {
  productId:number,
  productName:string,
  productDescription:string,
  productImage: string,
  productPrice:number,
  brandId: number,
  brandName: string,
  mainCategoryId: number,
  mainCategoryName:string,
  categoryId:number,
  categoryName: string,
  subCategoryId:number,
  subCategoryName: string
}
export interface cartDto{
  CartHeader: cartHeaderDto,
  CardDetails: cartDetailsDto
}
export interface cartHeaderDto{
    cartHeaderId: number,
    userId: string,
    couponCode: string,
    discount: number,
    cartTotal: number
}
export interface cartDetailsDto{
  CartDetailsId : number,
  CartHeaderId : number,       
  CartHeaderDto: cartHeaderDto,
  ProductId: number,
  ProductDto: productDto,
  Count : number
}
export interface productDto{
  productId:number,
  productName:string,
  productDescription:string,
  productImage: string,
  productPrice:number,
  categoryName: string,
  subCategoryName: string,
  categoryId:number,
  subCategoryId:number
}

   

