import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/User';
import { UserService } from './../../service/user.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsDTO } from 'src/app/model/UserDetailsDTO';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[] = [];
  public editUser: User;
  public page: number = 0;
  public size: number = 10;
  public max_pages: number;
  public max_items: number;
  public pageEvent: PageEvent;

  dialogRefEdit: MatDialogRef<DialogEditUserComponent>

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers(this.page, this.size).subscribe(
      (response: HttpResponse<User[]>) => { 
        this.users = response.body!;

        this.max_pages = parseInt(response.headers.get("Pages")!);
        this.max_items = parseInt(response.headers.get("Items")!);
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
  }

  public getUserById(id:number) {
    this.userService.getUserById(id).subscribe(
      (response: User) => { 
        return response;
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
  }

  onUpdateUser(userDetails: UserDetailsDTO, user: User):void{
    if(!!this.editUser?.userDetailsDTO?.id){
      userDetails.id=this.editUser?.userDetailsDTO?.id
    }

    if(!!this.editUser?.userDetailsDTO?.visitsDto){
      userDetails.visitsDto = this.editUser?.userDetailsDTO?.visitsDto
    }
    else{
      userDetails.visitsDto = []
    }
      this.userService.updateUserById(userDetails, user.id).subscribe(
        (response: UserDetailsDTO) => {
          console.log(response);
          this.getUsers();
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        },
      )
      document.getElementById("update-user-form")?.click()
  }

  openDialogEdit(id:number) {
    this.dialogRefEdit=this.dialog.open(DialogEditUserComponent, {
      data: {
        id: id
      }
    });
    this.dialogRefEdit.afterClosed().subscribe(
      (result:any) => {
        this.getUsers();
      }
    )
  }

  onPaginateChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;


    this.userService.getUsers(this.page, this.size).subscribe(
      (response: HttpResponse<User[]>) => { 
        this.users = response.body!;

        this.max_pages = parseInt(response.headers.get("Pages")!);
        this.max_items = parseInt(response.headers.get("Items")!);
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
  }


}
