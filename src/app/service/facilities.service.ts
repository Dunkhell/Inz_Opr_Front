import { Facility } from './../model/Facility';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {

  public apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }


  public getFacilities(page:number, size:number): Observable<HttpResponse<Facility[]>> {
    return this.http.get<Facility[]>(`${this.apiServerUrl}/admin/facilities?page=${page}&size=${size}`, { observe: 'response' });
  }

  public getFacilitiesById(id:number): Observable<Facility> {
    return this.http.get<Facility>(`${this.apiServerUrl}/admin/facilities/${id}`);
  }

  public addFacilities(visitDto:Facility): Observable<Facility> {
    return this.http.post<Facility>(`${this.apiServerUrl}/admin/facilities/`, visitDto);
  }

  public updateFacilitiesById(visitDto:Facility, id:number): Observable<Facility> {
    return this.http.put<Facility>(`${this.apiServerUrl}/admin/facilities/${id}`, visitDto);
  }

  public deleteFacilitiesById(id:number) {
    return this.http.delete<any>(`${this.apiServerUrl}/admin/facilities/${id}`);
  }

}
