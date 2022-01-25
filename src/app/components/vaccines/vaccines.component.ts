import { DialogEditVaccineComponent } from './dialog-edit-vaccine/dialog-edit-vaccine.component';
import { DialogDeleteVaccineComponent } from './dialog-delete-vaccine/dialog-delete-vaccine.component';
import { DialogAddVaccineComponent } from './dialog-add-vaccine/dialog-add-vaccine.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vaccine } from 'src/app/model/Vaccine';
import { VaccineService } from 'src/app/service/vaccine.service';
import { PageEvent } from '@angular/material/paginator';
import { VisitsDto } from 'src/app/model/VisitDTO';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.css']
})
export class VaccinesComponent implements OnInit {

  public vaccines: Vaccine[] =[];
  public editVaccine: Vaccine;
  public page: number = 0;
  public size: number = 10;
  public max_pages: number;
  public max_items: number;
  public pageEvent: PageEvent;
  
  dialogRef: MatDialogRef<DialogAddVaccineComponent>
  dialogRefEdit: MatDialogRef<DialogEditVaccineComponent>
  dialogRefDelete: MatDialogRef<DialogDeleteVaccineComponent>

  constructor(
    private http: HttpClient,
    private vaccineService: VaccineService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getVaccines();
  }

  public getVaccines(): void {
    this.vaccineService.getVaccines(this.page, this.size).subscribe(
      (response: HttpResponse<Vaccine[]>) => {
        this.vaccines = response.body!;

        this.max_pages = parseInt(response.headers.get("Pages")!);
        this.max_items = parseInt(response.headers.get("Items")!);
      },
      (error: HttpErrorResponse) =>{ console.log(error); }
    )
  }

  onUpdateVaccine(vaccine: Vaccine): void{
    this.vaccineService.updateVaccineById(vaccine, vaccine.id).subscribe(
      (response: Vaccine) => {
        console.log(response);
        this.getVaccines();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      },
    )
    document.getElementById("update-vaccine-form")?.click()
  }

  onAddVaccine(vaccine: Vaccine): void{
    this.vaccineService.addVaccine(vaccine).subscribe(
      (response: Vaccine) => {
        console.log(response);
        this.getVaccines();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      },
    )
  }

  onDeleteVaccine(id: number): void{
    this.vaccineService.deleteVaccine(id).subscribe(
      (response: Vaccine) => {
        console.log(response);
        this.getVaccines();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      },
    )
    document.getElementById("delete-vaccine-form")?.click()
  }

  openDialog() {
    this.dialogRef=this.dialog.open(DialogAddVaccineComponent);
    this.dialogRef.afterClosed().subscribe(
      (result:any) => {
        this.getVaccines();
      }
    )
  }

  openDialogDelete(id:number) {
    this.dialogRefDelete=this.dialog.open(DialogDeleteVaccineComponent, {
      data: {
        id: id
      }
    });
    this.dialogRefDelete.afterClosed().subscribe(
      (result:any) => {
        this.getVaccines();
      }
    )
  }

  openDialogEdit(id:number) {
    this.dialogRefEdit=this.dialog.open(DialogEditVaccineComponent, {
      data: {
        id: id
      }
    });
    this.dialogRefEdit.afterClosed().subscribe(
      (result:any) => {
        this.getVaccines();
      }
    )
  }

  onPaginateChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;


    this.vaccineService.getVaccines(this.page, this.size).subscribe(
      (response: HttpResponse<Vaccine[]>) => { 
        this.vaccines = response.body!;

        this.max_pages = parseInt(response.headers.get("Pages")!);
        this.max_items = parseInt(response.headers.get("Items")!);
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
  }

}