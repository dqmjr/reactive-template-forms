import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

interface IsalesTaxArray {
  id: number,
  title: string,
  value: number
}

interface Iitems {
  id: number,
  name: string,
  items: [{
    id: number,
    name: string,
    glCode: number,
    amount: number,
    salesTax: IsalesTaxArray
  }]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  totalAmount: number = 0;
  totalTaxes: number = 0;

  itemsTitles = [
    'Category',
    'Items',
    'Gl Code',
    'Amount',
    'Sales Tex',
    'Total'
  ];
  localItems: Iitems[] = [{
    id: 1,
    name: 'Category 1',
    items: [{
      id: 1,
      name: 'Item 1',
      glCode: 0,
      amount: 0,
      salesTax: { id: 0, title: '', value: 0 }
    }]
  }];
  salesTaxArray: IsalesTaxArray[] = [
    {id: 1, title: 'No tax', value: 0},
    {id: 2, title: 'Astana', value: 10},
    {id: 3, title: 'Almaty', value: 20}
  ]

  ngOnInit() {
    this.localItems[0].items[0].salesTax = this.salesTaxArray[0]  //for No Tax
  }

  submitForm(myForm: NgForm) {
    console.log(myForm)
    console.log(this.localItems)
  }
  addCategory(){
    this.localItems.push({
      id: -(new Date().getTime()),
      name: 'Category',
      items: [{
        id: -(new Date().getTime()),
        name: 'Item',
        glCode: 0,
        amount: 0,
        salesTax: { id: 0, title: '', value: 0 }
      }]
    })
  }
  removeCategory(id: number) {
    let idx = this.localItems.findIndex((item) => item.id === id)
    if (idx !== -1) {
      this.localItems.splice(idx, 1)
    }
  }
  addItemToCategory(id: number) {
    this.localItems.find((item) => {
      if(item.id === id) {
        item.items.push({
          id: -(new Date().getTime()),
          name: 'Item',
          glCode: 0,
          amount: 0,
          salesTax: { id: 0, title: '', value: 0 }
        })
      }
    })
  }

  removeItemFromCategory(catId: number, itemId: number) {
    this.localItems.find((item) => {
      const idx = item["items"].findIndex((item) => item.id === itemId)
      if (idx !== -1) {
        item["items"].splice(idx, 1)
      }
    })
  }
  getTotalAmount(isAmount: boolean) {
    let total = 0

    this.localItems.forEach((item) => {
      total = item.items.reduce((accumulator, currentValue) => {
        if (isAmount) {
          return accumulator + +currentValue.amount;
        }
        else {
          return accumulator + +currentValue.salesTax.value;
        }
      }, total)
    })

    if(isAmount) this.totalAmount = total
    else this.totalTaxes = total
  }
}
