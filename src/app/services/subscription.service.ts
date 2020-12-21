import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { subscriptiondata } from '../model/subscriptiondata';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  allSubscribeData: AngularFirestoreCollection<subscriptiondata>;
  allData: Observable<subscriptiondata[]>;
  editData: AngularFirestoreDocument<subscriptiondata>;

  constructor(public api: AngularFirestore, public router: Router,
    private _snackBar: MatSnackBar) {
    //   this.allSubscribeData = this.api.collection('alldata' , ref => ref.orderBy('name','asc'));

    //   this.allData= this.allSubscribeData.snapshotChanges().map(changes => {
    //     return changes.map(a => {
    //       const data = a.payload.doc.data() as subscriptiondata;
    //       data.id = a.payload.doc.id;
    //       return data;
    //   });
    // });

     }

    async AddSubscription(alldata) {
      await this.api.collection('subscription_post').add(alldata);
    }

    getAllSubscriptions() {

      return this.api.collection('subscription_post').snapshotChanges();
      
    }

    getSubscriptionbyId(subId) {
      console.log(subId);
      
      // return this.api.collection('subscription_post').doc(JSON.stringify(subId)).get();
      // return this.api.collection('subscription_post').where(allSubscribeData.FieldPath.documentId(), '==', 'fK3ddutEpD2qQqRMXNW5').get();

      
    }

    updateItem(item: subscriptiondata){
      this.editData = this.api.doc(`items/${item.id}`);
      this.editData.update(item);
    }
}
