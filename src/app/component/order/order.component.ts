import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  listOfOrders: Order[] = [];
  columns: string[] = ['id', 'name', 'bookid', 'book', 'date', 'returned'];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    let userid = this.api.getTokenUserInfo()?.id ?? 0;
    this.api.getOrdersOfUser(userid).subscribe({
      next: (res: Order[]) => {
        console.log(res);
        this.listOfOrders = res;
      },
      error: (err: any) => console.log(err),
    });
  }
}
