import { UserDetailsDTO } from './../../../model/UserDetailsDTO';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from './../../../service/user.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { User } from './../../../model/User';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.css']
})
export class DialogEditUserComponent implements OnInit {

  public editUser:User;
  public editUserFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<DialogEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.userService.getUserById(this.dialogRef.componentInstance.data.id).subscribe(
      (response: User) => { 
        this.editUser = response;
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
    this.editUserFormGroup =this.fb.group ({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      otherNames: new FormControl(""),
      dateOfBirth: new FormControl(""),
      contactPhone: new FormControl(""),
      country: new FormControl(""),
      city: new FormControl(""),
      street: new FormControl(""),
      gender: new FormControl(""),
    });
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.onUpdateUser(this.editUserFormGroup.value, this.dialogRef.componentInstance.data.id)
  }

  onUpdateUser(userdetails:UserDetailsDTO, userid:number):void{
      this.userService.updateUserById(userdetails, userid).subscribe(
        (response: UserDetailsDTO) => {
          console.log(response);
          this.onCloseDialog();
        },
        (error: HttpErrorResponse) =>{
          alert(error.message)
        },
      )
  }

}
