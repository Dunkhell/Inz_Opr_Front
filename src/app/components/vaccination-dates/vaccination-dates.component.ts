import { VisitsDto } from './../../model/VisitDTO';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { VaccinationDatesService } from './../../service/vaccination-dates.service';
import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-vaccination-dates',
  templateUrl: './vaccination-dates.component.html',
  styleUrls: ['./vaccination-dates.component.css']
})
export class VaccinationDatesComponent implements OnInit {

  public vaccinatioDates: VisitsDto[] = [];

  public page: number = 0;
  public size: number = 10;
  public max_pages: number;
  public max_items: number;
  public pageEvent: PageEvent;

  public qParams: Params;
  currentDate = new Date();
  city = new FormControl('');
  manufacturer = new FormControl('');
  fromDate = new FormControl('');
  toDate = new FormControl('');


  constructor(
    private http: HttpClient,
    private vaccinationDatesService: VaccinationDatesService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getURLParams();
    this.getVaccinatioDates();
  }

  getURLParams(): void{
    this.route.queryParams.subscribe(
      params => {
        this.qParams=params;
      }
    )
  }

  public getVaccinatioDates(): void {
    this.vaccinationDatesService.getVaccintaionDates(this.page, this.size, this.qParams).subscribe(
      (response: HttpResponse<VisitsDto[]>) => {
        this.vaccinatioDates = response.body!;

        this.max_pages = parseInt(response.headers.get("Pages")!);
        this.max_items = parseInt(response.headers.get("Items")!);
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
  }

  public registerUser(id:number) {
    this.vaccinationDatesService.registerUserById(id).subscribe(
      (response: any) => {
        console.log(response);
        this.getVaccinatioDates();
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
  }

  addParam(): void{
    let manufacturer = this.manufacturer.value;
    let city = this.city.value;
    let fromDate = this.fromDate.value;
    let toDate = this.toDate.value;
    this.router.navigate([], {
     queryParams: {
        ...(manufacturer && {manufacturer:manufacturer}),
        ...(city && {city: city}),
        ...(fromDate &&{fromDate: fromDate}),
        ...(toDate &&{toDate: toDate})
     },
     queryParamsHandling: '',
   }).then(
    ()=>this.getURLParams()
   ).then(
    ()=>this.getVaccinatioDates()
   )
  }

  onPaginateChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;


    this.vaccinationDatesService.getVaccintaionDates(this.page, this.size, this.qParams).subscribe(
      (response: HttpResponse<VisitsDto[]>) => {
        this.vaccinatioDates = response.body!;

        this.max_pages = parseInt(response.headers.get("Pages")!);
        this.max_items = parseInt(response.headers.get("Items")!);
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
  }
}
