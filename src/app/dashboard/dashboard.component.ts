import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../services/subscription.service';
import { subscriptiondata } from '../model/subscriptiondata';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // getSubscriptionData: any = [];
  colorcode: any;
  list: subscriptiondata[];

  constructor(private getSub: SubscriptionService, private store: Store) { }

  ngOnInit(): void {


    this.getSub.getAllSubscriptions().subscribe(actionArray => {
        this.list = actionArray.map(item => {
          console.log(item.payload.doc.id);
          return {
            
            id: item.payload.doc.id,
           ...item.payload.doc.data()  as subscriptiondata
          
          }
          
        })
        console.log(this.list);
    });
  }

  onEdit(subscribedata) {
    console
  }

}
