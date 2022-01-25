import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VisitsService } from './../../../service/visits.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-delete-visit',
  templateUrl: './dialog-delete-visit.component.html',
  styleUrls: ['./dialog-delete-visit.component.css']
})
export class DialogDeleteVisitComponent implements OnInit {

  public deleteVisitFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private visitService:VisitsService,
    private dialogRef: MatDialogRef<DialogDeleteVisitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.deleteVisitFormGroup =this.fb.group({});
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.onDeleteVisit(this.dialogRef.componentInstance.data.id);
  }

  onDeleteVisit(id:number):void{
      this.visitService.deleteVisitById(id).subscribe(
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
