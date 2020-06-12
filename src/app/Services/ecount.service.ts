import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {CounterInfo, Ecounter, Infos} from "../interface";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})

export class EcountService {

  info: Infos
  ecounter$: Observable<any>
  arEcounter: number = 0

  constructor(private http: HttpClient) {}

  getAll() : Observable<Ecounter[]> {
    this.arEcounter = 0;
    this.ecounter$ = this.http.get(`${environment.mainUrl}`)

    this.ecounter$
      .pipe(
        map((e: Ecounter[]) => {
            e.forEach(ae => {
              if(ae.id == 2 ){
                this.arEcounter += ae.lastdiffer
              }
              if(ae.id == 6 || ae.id == 7 || ae.id == 8){
                this.arEcounter -= ae.lastdiffer
              }
            })
          }
        )).subscribe(res => {
    })

    return this.ecounter$
  }

  // @ts-ignore
  saveIndication(ownerId: number, indication: number, pay: number): Observable<any>  {
    console.log(`pay = ${pay}`)

    const counterInfo: CounterInfo = {
      "ownerId": ownerId,
      "indication": indication,
      "edate": new Date(),
      "pay": pay
    };

    console.log(counterInfo)
    return this.http.post(`${environment.mainUrl}/ecount/create`, counterInfo)
  }


  getInfos(){
    this.http.get(`${environment.infosUrl}/1`)
    .subscribe( (info: Infos) => {
        this.info = info
      })
  }


  isPayToday(ecounter: Ecounter) : boolean {
    const now = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).toISOString()
    const last = new Date(new Date(ecounter.lastdate).getFullYear(),
      new Date(ecounter.lastdate).getMonth(),
      new Date(ecounter.lastdate).getDate()).toISOString()
    return now === last
  }


}
