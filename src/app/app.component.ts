import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  itemsTitles = [
    'Category',
    'Items',
    'Gl Code',
    'Amount',
    'Sales Tex',
    'Total'
  ];
  localItems: any = [{
    id: 1,
    name: 'Category 1',
    items: [{
      id: 1,
      name: 'Item 1',
      glCode: null,
      amount: null,
      salesTax: null
    }]
  }];
  salesTaxArray = [
    {id: 1, title: 'No tax', value: 0},
    {id: 2, title: 'Astana', value: 10},
    {id: 3, title: 'Almaty', value: 20}
  ]

  submitForm(myForm: NgForm) {
    console.log(myForm)
  }
}
