import { Observable } from 'rxjs';
import { VisitsDto } from './../model/VisitDTO';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VaccinationDatesService {

  public apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getVaccintaionDates(page:number, size:number, params: Params): Observable<HttpResponse<VisitsDto[]>> {
    let qparams= "?";
    qparams=qparams+"page="+String(page)+"&"
    qparams=qparams+"size="+String(size)+"&"
    if(params.city){
      qparams=qparams+"city="+params.city+"&"
    }
    if(params.fromDate){
      qparams=qparams+"fromDate="+params.fromDate+"&"
    }
    if(params.toDate){
      qparams=qparams+"toDate="+params.toDate+"&"
    }
    if(params.manufacturer){
      qparams=qparams+"manufacturer="+params.manufacturer+"&"
    }
    if(params.page){
      qparams=qparams+"page="+params.page+"&"
    }
    if(params.size){
      qparams=qparams+"size="+params.size+"&"
    }
    if(params.sortBy){
      qparams=qparams+"sortBy="+params.sortBy
    }
    return this.http.get<VisitsDto[]>(`${this.apiServerUrl}/user/visits/vaccination-dates${qparams}`, { observe: 'response' });
  }

  registerUserById(id: number) {
    return this.http.put<any>(`${this.apiServerUrl}/user/visits/vaccination-dates/${id}`, id);
  }
}
