import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as moment from 'moment';

// services
import { AuthenticationService } from '../../services/authentication.service';

declare var swal: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private unsubscribe = new Subject<void>();
  form: FormGroup;
  passwordType: String = 'password';
  showPasswordError = false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    @Inject('LocalStorage') localStorage,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    if (!this.form.valid) {
      return;
    }

    const request = this.form.value;
    this.authenticationService.login(request)
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe((auth: any) => {        
        if (!auth) {
          return;
        }

        if (!auth.sucess){
          swal({
            text: auth.messsage,
            type: 'warning'
          });
          return;
        }

        localStorage.setItem('authData', JSON.stringify({ name: auth.name, token: auth.token }));
        this.router.navigateByUrl('/app/dashboard');
      }, (error) => {
        swal({
          text: 'Usuário ou senha inválido!',
          type: 'warning'
        });
      });
  }

  getHostErrorMessage(): string {
    return '';
  }
}
