import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VisitsService } from './../../../service/visits.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { VisitsDto } from './../../../model/VisitDTO';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-edit-visit',
  templateUrl: './dialog-edit-visit.component.html',
  styleUrls: ['./dialog-edit-visit.component.css']
})
export class DialogEditVisitComponent implements OnInit {

  public editVisit:VisitsDto;
  public editVisitsFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private visitService:VisitsService,
    private dialogRef: MatDialogRef<DialogEditVisitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.visitService.getVisitsById(this.dialogRef.componentInstance.data.id).subscribe(
      (response: VisitsDto) => { 
        console.log(response);
        this.editVisit = response;
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
    this.editVisitsFormGroup =this.fb.group ({
      visitDate: new FormControl(""),
      visitDateTime: new FormControl(""),
      facility : this.fb.group({
        id: new FormControl(""),
      }),
      vaccine : this.fb.group({
        id: new FormControl(""),
      })
    });
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.onUpdateVisit(this.editVisitsFormGroup.value, this.dialogRef.componentInstance.data.id)
  }

  onUpdateVisit(visit: VisitsDto, id:number):void{
      this.visitService.updateVisitById(visit, id).subscribe(
        (response: VisitsDto) => {
          console.log(response);
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        },
      )
      this.onCloseDialog();
  }

}
