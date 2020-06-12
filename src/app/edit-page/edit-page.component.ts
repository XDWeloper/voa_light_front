import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Ecounter, Infos} from "../interface";
import {EcountService} from "../Services/ecount.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  ecounter: Ecounter
  evalue: number
  today: Date
  paytoday: number = 0
  ecounterdif: number
  info: Infos
  spec: number
  internet: number = 0
  isInternet: boolean = false


  constructor(private route: ActivatedRoute,
              private rout: Router,
              private ecountService: EcountService,
              ) { }

  ngOnInit() {
    this.route.params.subscribe((ecounter: Ecounter) => {
      this.ecounter = ecounter
    })
    this.today = new Date()
    this.info = this.ecountService.info

    if(this.ecounter.id == 6 || this.ecounter.id == 7 || this.ecounter.id == 9)
      this.isInternet = true


    if(this.ecounter.id == 9) {
      this.ecounterdif = this.ecountService.arEcounter
      this.onKeyUp()
    }


  }

  saveIndication() {
    if(this.ecounter.id == 4) {//Спец расчет для Вера
      this.paytoday = 6000
    }

    if(this.ecountService.isPayToday(this.ecounter)){
      console.log(`Нужно не сохранить а обновить`)
      console.log(this.ecounter)

    } else{
      this.ecountService.saveIndication(this.ecounter.id,this.evalue,this.paytoday).subscribe(
        res=> {
          console.log(res)
          this.rout.navigate(['/home'])
        },
        error => {console.log('Error')})
    }


    }

  onKeyUp() {
    if(this.ecounter.id == 9){//Спец расчет для Армена
      this.evalue = this.ecounter.indication + this.ecounterdif
    }else {
      this.ecounterdif = this.evalue - this.ecounter.indication
    }



    if(this.isInternet && this.ecounter.id == 6)
      this.internet = this.info.internet * 2
    else if(this.isInternet)
      this.internet = this.info.internet


    this.paytoday = this.ecounterdif * this.info.energycost + this.info.rentcost + this.internet

    //
    //
    // console.log(`ecounterdif = ${this.ecounterdif}`)
    // console.log(`info.energycost = ${this.info.energycost}`)
    // console.log(`this.info.rentcost = ${this.info.rentcost}`)
    // console.log(`this.internet = ${this.internet}`)
    // console.log(`this.paytoday = ${this.paytoday}`)
    //
    // console.log(`----------------------------------------------`)




    if(this.ecounter.id == 6){//Спец расчет для Васи и Андрея каждому отдельно
      this.spec = this.ecounterdif / 2 * this.info.energycost + this.info.rentcost + this.internet/2
    }


  }
}
