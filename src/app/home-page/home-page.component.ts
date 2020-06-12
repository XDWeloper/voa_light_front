import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Ecounter} from "../interface";
import {EcountService} from "../Services/ecount.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  ecounter$: Observable<Ecounter[]>

  constructor(private ecounterService: EcountService, private router: Router) { }

  ngOnInit() {
    this.ecounter$ = this.ecounterService.getAll()
   }

  onClick(ecounter: Ecounter) {
    this.router.navigate(['edit',ecounter])
  }
}
