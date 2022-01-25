import { Facility } from './../../../model/Facility';
import { FacilitiesService } from './../../../service/facilities.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-facility',
  templateUrl: './dialog-add-facility.component.html',
  styleUrls: ['./dialog-add-facility.component.css']
})
export class DialogAddFacilityComponent implements OnInit {
  public addFacilityFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private facilityService: FacilitiesService,
    private dialogRef: MatDialogRef<DialogAddFacilityComponent>
    ) { }

  ngOnInit(): void {
    this.addFacilityFormGroup =this.fb.group ({
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
    console.log(this.addFacilityFormGroup.controls.name.value);
    this.facilityService.addFacilities(this.addFacilityFormGroup.value).subscribe(
      (response: Facility) => {
        console.log(response);
        this.onCloseDialog();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
