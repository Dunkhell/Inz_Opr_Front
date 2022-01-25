import { Vaccine } from './../../../model/Vaccine';
import { MatDialogRef } from '@angular/material/dialog';
import { VaccineService } from './../../../service/vaccine.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-add-vaccine',
  templateUrl: './dialog-add-vaccine.component.html',
  styleUrls: ['./dialog-add-vaccine.component.css']
})
export class DialogAddVaccineComponent implements OnInit {
  public addVaccineFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vaccineService: VaccineService,
    private dialogRef: MatDialogRef<DialogAddVaccineComponent>
    ) { }

  ngOnInit(): void {
    this.addVaccineFormGroup =this.fb.group ({
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
    console.log(this.addVaccineFormGroup.controls.name.value);
    this.vaccineService.addVaccine(this.addVaccineFormGroup.value).subscribe(
      (response: Vaccine) => {
        console.log(response);
        this.onCloseDialog();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
