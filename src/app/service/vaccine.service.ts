import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vaccine } from '../model/Vaccine';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  public apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getVaccines(page:number, size:number): Observable<HttpResponse<Vaccine[]>> {
    return this.http.get<Vaccine[]>(`${this.apiServerUrl}/admin/vaccines?page=${page}&size=${size}`, { observe: 'response' });
  }

  public getVaccineById(id: number): Observable<Vaccine> {
    return this.http.get<Vaccine>(`${this.apiServerUrl}/admin/vaccines/${id}`);
  }
  public updateVaccineById(vaccine: Vaccine, id: number):Observable<Vaccine>{
    return this.http.put<Vaccine>(`${this.apiServerUrl}/admin/vaccines/${id}`, vaccine);
  }

  public addVaccine(vaccine: Vaccine):Observable<Vaccine>{
    return this.http.post<Vaccine>(`${this.apiServerUrl}/admin/vaccines`, vaccine);
  }
  public deleteVaccine(id: number):Observable<Vaccine>{
    return this.http.delete<Vaccine>(`${this.apiServerUrl}/admin/vaccines/${id}`);
  }
}
