import { BatchVisits } from './../../../model/BatchVisit';
import { VisitsService } from './../../../service/visits.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-many-visits',
  templateUrl: './dialog-add-many-visits.component.html',
  styleUrls: ['./dialog-add-many-visits.component.css']
})
export class DialogAddManyVisitsComponent implements OnInit {
  public batchVisitFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private visitService: VisitsService,
    private dialogRef: MatDialogRef<DialogAddManyVisitsComponent>
    ) { }

  ngOnInit(): void {
    this.batchVisitFormGroup =this.fb.group ({
      facility_id: new FormControl(""),
      vaccine_id: new FormControl(""),
      visitInfo: this.fb.group({
        day: new FormControl(""),
        start: new FormControl(""),
        end: new FormControl(""),
        interval: new FormControl("")
      })
    });
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.batchVisitFormGroup.controls.visitInfo.value);
    this.addVisitsInBatch(this.batchVisitFormGroup.controls.facility_id.value,
      this.batchVisitFormGroup.controls.vaccine_id.value,
      new BatchVisits(this.batchVisitFormGroup.controls.visitInfo.value));
  }


  addVisitsInBatch(facility_id: number, vaccine_id:number,visitInfo :BatchVisits) {
    moment.locale("pl-PL");
    visitInfo.start = moment(visitInfo.start, "HH:mm:ss").format('LTS');
    visitInfo.end = moment(visitInfo.end, "HH:mm:ss").format('LTS');

    this.visitService.addVisitsInBatch(facility_id, vaccine_id, visitInfo).subscribe(
      (response: any) => {
        this.dialogRef.close();
        console.log(response);
      },
      (error: HttpErrorResponse) => { console.log(error); }
    );
  }
}
