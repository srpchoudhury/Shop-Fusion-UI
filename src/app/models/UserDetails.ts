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

interface CartHeaderDto {
  cartHeaderId: number;
  userId: string;
  couponCode?: string;
  discount: number;
  cartTotal: number;
}

interface ProductDto {
  productId: number;
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: number;
  categoryName: string;
  subCategoryName: string;
  categoryId: number;
  subCategoryId: number;
}

interface CartDetailsDto {
  cartDetailsId: number;
  cartHeaderId: number;
  cartHeader?: CartHeaderDto;
  productId: number;
  product?: ProductDto;
  count: number;
}

interface CartDto {
  cartHeader: CartHeaderDto;
  cartDetails?: CartDetailsDto[];
}

export { CartDto, CartHeaderDto, CartDetailsDto, ProductDto };