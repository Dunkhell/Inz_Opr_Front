import { DialogDeleteFacilityComponent } from './dialog-delete-facility/dialog-delete-facility.component';
import { DialogEditFacilityComponent } from './dialog-edit-facility/dialog-edit-facility.component';
import { DialogAddFacilityComponent } from './dialog-add-facility/dialog-add-facility.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Facility } from './../../model/Facility';
import { FacilitiesService } from './../../service/facilities.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {
  public facilities: Facility[] = [];
  public editFacility: Facility;
  public page: number = 0;
  public size: number = 10;
  public max_pages: number;
  public max_items: number;
  public pageEvent: PageEvent;

  dialogRef: MatDialogRef<DialogAddFacilityComponent>
  dialogRefEdit: MatDialogRef<DialogEditFacilityComponent>
  dialogRefDelete: MatDialogRef<DialogDeleteFacilityComponent>

  constructor(
    private http: HttpClient,
    private facilityService: FacilitiesService,
    private router: Router,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getFacilities();
  }


  public getFacilities(): void {
    this.facilityService.getFacilities(this.page, this.size).subscribe(
      (response: HttpResponse<Facility[]>) => { 
        this.facilities = response.body!;

        this.max_pages = parseInt(response.headers.get("Pages")!);
        this.max_items = parseInt(response.headers.get("Items")!);
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
  }


  public deleteFaciliti(id:number) {
    this.facilityService.deleteFacilitiesById(id).subscribe(
      (response: any) => { 
        console.log(response);
        this.getFacilities();
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
    document.getElementById("delete-visit-form")?.click()
  }

  public onAddFaciliti(addForm: NgForm): void {
    this.facilityService.addFacilities(addForm.value).subscribe(
      (response: Facility) => {
        console.log(response);
        this.getFacilities();
        // addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  onUpdateFaciliti(visit: Facility):void{
    if(!!this.editFacility?.id){
      visit.id=this.editFacility?.id
    }
      this.facilityService.updateFacilitiesById(visit, visit.id).subscribe(
        (response: Facility) => {
          console.log(response);
          this.getFacilities();
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        },
      )
      document.getElementById("update-user-form")?.click()
  }

  openDialog() {
    this.dialogRef=this.dialog.open(DialogAddFacilityComponent);
    this.dialogRef.afterClosed().subscribe(
      (result:any) => {
        this.getFacilities();
      }
    )
  }

  openDialogEdit(id:number) {
    this.dialogRefEdit=this.dialog.open(DialogEditFacilityComponent, {
      data: {
        id: id
      }
    });
    this.dialogRefEdit.afterClosed().subscribe(
      (result:any) => {
        this.getFacilities();
      }
    )
  }

  openDialogDelete(id:number) {
    this.dialogRefDelete=this.dialog.open(DialogDeleteFacilityComponent, {
      data: {
        id: id
      }
    });
    this.dialogRefDelete.afterClosed().subscribe(
      (result:any) => {
        this.getFacilities();
      }
    )
  }

  onPaginateChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;

    this.facilityService.getFacilities(this.page, this.size).subscribe(
      (response: HttpResponse<Facility[]>) => { 
        this.facilities = response.body!;

        this.max_pages = parseInt(response.headers.get("Pages")!);
        this.max_items = parseInt(response.headers.get("Items")!);
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
  }

}
