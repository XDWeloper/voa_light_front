import {Component, Input, OnInit} from '@angular/core';
import {Ecounter, Infos} from "../interface";
import {EcountService} from "../Services/ecount.service";

@Component({
  selector: 'app-ecounter',
  templateUrl: './ecounter.component.html',
  styleUrls: ['./ecounter.component.scss']
})
export class EcounterComponent implements OnInit {

  @Input() ecounter: Ecounter

  isPay : boolean
  isVisible: boolean = true;
  internet: number
  info: Infos


  constructor(private serv: EcountService) { }

  ngOnInit() {
    // const now = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).toISOString()
    // const last = new Date(new Date(this.ecounter.lastdate).getFullYear(),
    //                       new Date(this.ecounter.lastdate).getMonth(),
    //                       new Date(this.ecounter.lastdate).getDate()).toISOString()
    this.isPay = this.serv.isPayToday(this.ecounter)

    this.info = this.serv.info

    if(this.ecounter.id == 6 || this.ecounter.id == 7 || this.ecounter.id == 9)
      this.internet = this.info.internet
    else
      this.internet = 0

    if(this.ecounter.id == 6 && this.ecounter.pay != null){//Спец расчет для 1 2 бокса
      const rentcost = this.serv.info.rentcost
      this.ecounter.pay = rentcost + (this.ecounter.pay - rentcost) / 2
    }


  }


}
