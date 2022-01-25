import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacilitiesService } from './../../../service/facilities.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-delete-facility',
  templateUrl: './dialog-delete-facility.component.html',
  styleUrls: ['./dialog-delete-facility.component.css']
})
export class DialogDeleteFacilityComponent implements OnInit {

  public deleteFacilityFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private facilityService: FacilitiesService,
    private dialogRef: MatDialogRef<DialogDeleteFacilityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.deleteFacilityFormGroup =this.fb.group({});
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.onDeleteFacility(this.dialogRef.componentInstance.data.id);
  }

  onDeleteFacility(id:number):void{
      this.facilityService.deleteFacilitiesById(id).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        },
      )
      this.onCloseDialog();
  }

}
