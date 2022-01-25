import { VisitsDto } from './../model/VisitDTO';
import { UserDetailsToUpdateDto } from './../model/UserDetailsToUpdateDto';
import { UserDetailsDTO } from './../model/UserDetailsDTO';
import { User } from 'src/app/model/User';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getUsers(page:number, size:number): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(`${this.apiServerUrl}/admin/users?page=${page}&size=${size}`, { observe: 'response' });
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/profile`);
  }

  public getYourVisits(): Observable<VisitsDto[]> {
    return this.http.get<VisitsDto[]>(`${this.apiServerUrl}/user/visits/vaccination-dates/myvisits`);
  }

  public getUserById(id:number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/admin/users/${id}`);
  }

  public updateUserById(userDetails: UserDetailsDTO, id: number):Observable<UserDetailsDTO>{
    return this.http.put<UserDetailsDTO>(`${this.apiServerUrl}/admin/users/${id}`, userDetails);
  }

  public updateUser(userDetails: UserDetailsToUpdateDto):Observable<UserDetailsToUpdateDto>{
    return this.http.put<UserDetailsToUpdateDto>(`${this.apiServerUrl}/user/profile`, userDetails);
  }

  public cancelVisitById(id: number) {
    return this.http.put<any>(`${this.apiServerUrl}/user/profile/cancel/${id}`, id);
  }
}
