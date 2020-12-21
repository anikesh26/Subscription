import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ColorEvent } from "ngx-color";
import { DialogData } from "../Subscription/addproject/addproject.component";

@Component({
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
custom_Color: boolean = false;
  colorpicked: any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    // this.dialogRef.close();
    this.custom_Color = true;
  }
  onBack() {
    this.custom_Color = false;
  }
  handleChangeComplete($event: ColorEvent) {
    console.log($event.color);
    this.colorpicked = $event.color;
    this.data.animal = this.colorpicked;

    // $event.color = {
    //   hex: '#333',
    //   rgb: {
    //     r: 51,
    //     g: 51,
    //     b: 51,
    //     a: 1,
    //   },
    //   hsl: {
    //     h: 0,
    //     s: 0,
    //     l: .20,
    //     a: 1,
    //   },
    // }
  }
  submitColor() {
    this.data.animal = this.colorpicked.hex;
    console.log(JSON.stringify(this.data.animal));
    this.dialogRef.close();

  }
}
