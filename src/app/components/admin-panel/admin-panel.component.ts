import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isActive(name:string):boolean{
    return (localStorage.getItem("active_admin-nav")==name);
  }

  makeActive(name:string): void{
    localStorage.setItem("active_admin-nav", name);
  }

}
