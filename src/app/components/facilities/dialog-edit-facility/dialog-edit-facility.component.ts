import { Facility } from './../../../model/Facility';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacilitiesService } from './../../../service/facilities.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-edit-facility',
  templateUrl: './dialog-edit-facility.component.html',
  styleUrls: ['./dialog-edit-facility.component.css']
})
export class DialogEditFacilityComponent implements OnInit {

  public editFacility:Facility;
  public editFacilityFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private facilityService: FacilitiesService,
    private dialogRef: MatDialogRef<DialogEditFacilityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.facilityService.getFacilitiesById(this.dialogRef.componentInstance.data.id).subscribe(
      (response: Facility) => { 
        this.editFacility = response;
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
    this.editFacilityFormGroup =this.fb.group ({
      facility_id: new FormControl(""),
      name: new FormControl(""),
      contactPhone: new FormControl(""),
      country: new FormControl(""),
      city: new FormControl(""),
      street: new FormControl(""),
    });
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.onUpdateFaciliti(this.editFacilityFormGroup.value, this.dialogRef.componentInstance.data.id)
  }

  onUpdateFaciliti(facility: Facility, id:number):void{
      this.facilityService.updateFacilitiesById(facility, id).subscribe(
        (response: Facility) => {
          console.log(response);
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        },
      )
      this.onCloseDialog();
  }

}
