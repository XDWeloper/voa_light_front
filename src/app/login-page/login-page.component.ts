import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  submited = false
  message: string

  constructor(public auth: AuthService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.auth.logout()
    if(this.route.queryParams.subscribe( (params: Params) => {
      if(params['loginAgain']){
        this.message = 'Пожалуйста введите данные'
      } else if(params['authFailed']){
        this.message = 'Сессмя истекла введите данные заново'
      }
    }))

      this.form = new FormGroup({
        password: new FormControl(null, [Validators.required])
      });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submited =  true

    this.auth.login(this.form.value.password).subscribe(() => {

        this.form.reset()
        this.router.navigate(['/home'])
        this.submited = false
    }, () => {
      this.submited = false
      }
    )
  }

}
