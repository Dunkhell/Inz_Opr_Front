import { BatchVisits } from './../model/BatchVisit';
import { Observable } from 'rxjs';
import { VisitsDto } from './../model/VisitDTO';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  public apiServerUrl = environment.apiServerUrl;
  public apiGoogleUrl = environment.apiGoogleUrl;

  constructor(private http: HttpClient) { }


  public getVisits(page:number, size:number): Observable<HttpResponse<VisitsDto[]>> {
    return this.http.get<VisitsDto[]>(`${this.apiServerUrl}/admin/visits?page=${page}&size=${size}`, { observe: 'response' });
  }

  public getVisitsById(id:number): Observable<VisitsDto> {
    return this.http.get<VisitsDto>(`${this.apiServerUrl}/admin/visits/${id}`);
  }

  public addVisit(visitDto:VisitsDto, facility_id:number, vaccine_id:number): Observable<VisitsDto> {
    return this.http.post<VisitsDto>(`${this.apiServerUrl}/admin/visits/${facility_id}/${vaccine_id}`, visitDto);
  }

  public updateVisitById(visitDto:VisitsDto, id:number): Observable<VisitsDto> {
    return this.http.put<VisitsDto>(`${this.apiServerUrl}/admin/visits/${id}`, visitDto);
  }

  public deleteVisitById(id:number) {
    return this.http.delete<any>(`${this.apiServerUrl}/admin/visits/${id}`);
  }

  public addVisitsInBatch(facility_id: number, vaccine_id: number, batchInfo: BatchVisits) {
    return this.http.post<any>(`${this.apiServerUrl}/admin/visits/batch/${facility_id}/${vaccine_id}`, batchInfo);
  }

  public deleteDeleteOldAndUnusedVisits() {
    return this.http.delete<any>(`${this.apiGoogleUrl}/admin/visits/deleteoldandunused`);
  }

  public confirmVisitById(id:number) {
    return this.http.put<any>(`${this.apiServerUrl}/admin/visits/${id}/confirm`, id);
  }

}
