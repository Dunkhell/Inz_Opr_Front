import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VaccineService } from './../../../service/vaccine.service';
import { Vaccine } from './../../../model/Vaccine';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-edit-vaccine',
  templateUrl: './dialog-edit-vaccine.component.html',
  styleUrls: ['./dialog-edit-vaccine.component.css']
})
export class DialogEditVaccineComponent implements OnInit {

  public editVaccine:Vaccine;
  public editVaccineFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vaccineService:VaccineService,
    private dialogRef: MatDialogRef<DialogEditVaccineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.vaccineService.getVaccineById(this.dialogRef.componentInstance.data.id).subscribe(
      (response: Vaccine) => { 
        console.log(response);
        this.editVaccine = response;
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
    this.editVaccineFormGroup =this.fb.group ({
      manufacturer: new FormControl(""),
      name: new FormControl(""),
      vaccineDose: new FormControl(""),
      expirationDate: new FormControl("")
    });
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.onUpdateVaccine(this.editVaccineFormGroup.value, this.dialogRef.componentInstance.data.id)
  }

  onUpdateVaccine(vaccine: Vaccine, id:number):void{
      this.vaccineService.updateVaccineById(vaccine, id).subscribe(
        (response: Vaccine) => {
          console.log(response);
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        },
      )
      this.onCloseDialog();
  }

}
