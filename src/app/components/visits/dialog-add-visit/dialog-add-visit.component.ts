import { VisitsDto } from './../../../model/VisitDTO';
import { MatDialogRef } from '@angular/material/dialog';
import { VisitsService } from './../../../service/visits.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-add-visit',
  templateUrl: './dialog-add-visit.component.html',
  styleUrls: ['./dialog-add-visit.component.css']
})
export class DialogAddVisitComponent implements OnInit {

  public addVisitFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private visitsService: VisitsService,
    private dialogRef: MatDialogRef<DialogAddVisitComponent>
    ) { }

  ngOnInit(): void {
    this.addVisitFormGroup =this.fb.group ({
      visitDate: new FormControl(""),
      visitDateTime: new FormControl(""),
      facility_id: new FormControl(""),
      vaccine_id: new FormControl("")
    });
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.visitsService.addVisit(this.addVisitFormGroup.value,
                                this.addVisitFormGroup.controls.facility_id.value,
                                this.addVisitFormGroup.controls.vaccine_id.value).subscribe(
      (response: VisitsDto) => {
        console.log(response);
        this.onCloseDialog();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
