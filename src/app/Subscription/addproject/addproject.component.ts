import { Component, OnInit, Inject } from '@angular/core';
import { ColorEvent } from 'ngx-color';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { DialogOverviewExampleDialog } from 'src/app/dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import { subscriptiondata } from 'src/app/model/subscriptiondata';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  animal: string;
  name: string;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  SubscriptionForm: FormGroup;
  id: any;

  constructor(public dialog: MatDialog, private addSubscribe: SubscriptionService,
    private fb: FormBuilder, private route: ActivatedRoute, private rout: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.addSubscribe.getSubscriptionbyId(this.id);


    this.SubscriptionForm = this.fb.group ({
      price: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      billing_date: ['', Validators.required],
      billing_period: ['month', Validators.required],
      first_payment: ['', Validators.required],
      expiry_date: [""],
      payment_method: ['', Validators.required],
      note: ['', Validators.required],
      color: [""]
    });

    // this.onEdit(sub);
  }
  
  onSubmit() {
    this.SubscriptionForm.patchValue({
      color: this.animal,
    });
    console.log(this.SubscriptionForm.value);
    if(this.SubscriptionForm.invalid) {
      return;
    }
    this.addSubscribe.AddSubscription(this.SubscriptionForm.value).then(res => {
      console.log(res);
      this._snackBar.open('Subscription Added', 'Close', {
        duration: 2000,
      });
      this.rout.navigate(['/dashboard']);
    });
  }


  onEdit(sub: subscriptiondata) {
    sub = this.id;
    console.log(sub);
    // this.addSubscribe.getSubscriptionbyId(sub).subscribe( res =>{
    //   console.log(res);
    // })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: { animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result.hex;
      console.log(this.animal);
    });
  }

}



