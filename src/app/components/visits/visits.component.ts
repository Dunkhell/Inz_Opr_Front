import { DialogAddManyVisitsComponent } from './dialog-add-many-visits/dialog-add-many-visits.component';
import { DialogEditVisitComponent } from './dialog-edit-visit/dialog-edit-visit.component';
import { DialogDeleteVisitComponent } from './dialog-delete-visit/dialog-delete-visit.component';
import { DialogAddVisitComponent } from './dialog-add-visit/dialog-add-visit.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VisitsDto } from './../../model/VisitDTO';
import { VisitsService } from './../../service/visits.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

  public visits: VisitsDto[] = [];
  public editVisit: VisitsDto;
  public page: number = 0;
  public size: number = 10;
  public max_pages: number;
  public max_items: number;
  public pageEvent: PageEvent;

  dialogRef: MatDialogRef<DialogAddVisitComponent>
  dialogRefEdit: MatDialogRef<DialogEditVisitComponent>
  dialogRefDelete: MatDialogRef<DialogDeleteVisitComponent>
  manyVisitsDialogRef: MatDialogRef<DialogAddManyVisitsComponent>;

  constructor(
    private http: HttpClient,
    private visitService: VisitsService,
    private router: Router,
    public dialog: MatDialog
    ) { }



  ngOnInit(): void {
    this.getVisits();
  }

  public previousPage() {
    this.page-=1;
    if(this.page===-1) {
      this.page=0;
    }
    this.getVisits();
  } 
  
  public nextPage() {
    this.page+=1;
    if (this.page >= this.max_pages -1) {
      this.page = this.max_pages - 1;
    } 
    this.getVisits();
  }

  public getVisits(): void {
    this.visitService.getVisits(this.page, this.size).subscribe(
      (response: HttpResponse<VisitsDto[]>) => { 
        this.visits = response.body!;

        this.max_pages = parseInt(response.headers.get("Pages")!);
        this.max_items = parseInt(response.headers.get("Items")!);
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
  }


  public deleteVisit(id:number) {
    this.visitService.deleteVisitById(id).subscribe(
      (response: any) => { 
        console.log(response);
        this.getVisits();
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
    document.getElementById("delete-visit-form")?.click()
  }


  public onAddVisit(addForm: NgForm): void {
    // document.getElementById('add-employee-form')?.click();
    const vaccine_id = (<HTMLInputElement>document.getElementById("vaccine.id")).value;
    const facility_id = (<HTMLInputElement>document.getElementById("facility.id")).value;
    this.visitService.addVisit(addForm.value, +facility_id, +vaccine_id).subscribe(
      (response: VisitsDto) => {
        console.log(response);
        this.getVisits();
        // addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  onUpdateVisit(visit: VisitsDto):void{
      this.visitService.updateVisitById(visit, visit.id).subscribe(
        (response: VisitsDto) => {
          console.log(response);
          this.getVisits();
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        },
      )
      document.getElementById("update-user-form")?.click()
  }

  openDialog() {
    this.dialogRef=this.dialog.open(DialogAddVisitComponent);
    this.dialogRef.afterClosed().subscribe(
      (result:any) => {
        this.getVisits();
      }
    )
  }

  openDialogDelete(id:number) {
    this.dialogRefDelete=this.dialog.open(DialogDeleteVisitComponent, {
      data: {
        id: id
      }
    });
    this.dialogRefDelete.afterClosed().subscribe(
      (result:any) => {
        this.getVisits();
      }
    )
  }

  openDialogEdit(id:number) {
    this.dialogRefEdit=this.dialog.open(DialogEditVisitComponent, {
      data: {
        id: id
      }
    });
    this.dialogRefEdit.afterClosed().subscribe(
      (result:any) => {
        this.getVisits();
      }
    )
  }

  addManyVisits() {
    this.manyVisitsDialogRef=this.dialog.open(DialogAddManyVisitsComponent, {
      height: '750px',
      width: '500px'
    });
    this.manyVisitsDialogRef.afterClosed().subscribe(
      (result:any) => {
        this.getVisits();
      }
    )
  }

  onPaginateChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;


    this.visitService.getVisits(this.page, this.size).subscribe(
      (response: HttpResponse<VisitsDto[]>) => { 
        this.visits = response.body!;

        this.max_pages = parseInt(response.headers.get("Pages")!);
        this.max_items = parseInt(response.headers.get("Items")!);
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
  }

  deleteOldAndUnusedVisits() {
    this.visitService.deleteDeleteOldAndUnusedVisits().subscribe(
      (response: any) => { 
        console.log(response);
        this.getVisits();
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
  }

  confirmVisitById(id:number) {
    this.visitService.confirmVisitById(id).subscribe(
      (response: any) => { 
        console.log(response);
        this.getVisits();
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
  }

}
