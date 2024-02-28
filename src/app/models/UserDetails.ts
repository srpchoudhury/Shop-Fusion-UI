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