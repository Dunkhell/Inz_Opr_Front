import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VaccineService } from './../../../service/vaccine.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-delete-vaccine',
  templateUrl: './dialog-delete-vaccine.component.html',
  styleUrls: ['./dialog-delete-vaccine.component.css']
})
export class DialogDeleteVaccineComponent implements OnInit {

  
  public deleteVaccineFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vaccineSerVice:VaccineService,
    private dialogRef: MatDialogRef<DialogDeleteVaccineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.deleteVaccineFormGroup =this.fb.group({});
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.onDeleteFacility(this.dialogRef.componentInstance.data.id);
  }

  onDeleteFacility(id:number):void{
      this.vaccineSerVice.deleteVaccine(id).subscribe(
        (response: any) => {
          console.log(response);
          this.onCloseDialog();
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        },
      )
  }

}
