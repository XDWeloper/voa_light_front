import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../Services/auth.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(public authServ: AuthService) { }

  ngOnInit() {
  }

}
