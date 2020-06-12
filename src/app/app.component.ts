import {Component, OnInit} from '@angular/core';
import {EcountService} from "./Services/ecount.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'voa-light';


  constructor(private ecounterService: EcountService) {
  }

  ngOnInit(): void {
    this.ecounterService.getInfos()
  }
}
