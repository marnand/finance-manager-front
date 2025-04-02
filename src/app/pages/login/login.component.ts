import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Result } from '@app/core/model/Result';
import { State } from '@app/core/model/State';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { Common } from '@app/core/utils/common';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  #fb = inject(FormBuilder);
  #service = inject(LoginService);
  #common = inject(Common);
  #snackbar = inject(SnackbarService);

  state = new State<string>();
  form = this.#fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }
  );

  ngOnInit(): void { }

  ngOnDestroy = (): void => this.state.destroy();

  goToRegister() {
    this.form.reset();
    this.#common.goToPage('/registrar');
  }

  onSubmit() {
    if (!this.form.valid) {
      this.#snackbar.show({ message: 'Campos inválidos.', type: 'error' });
      return;
    }

    this.state.connect(this.#service.login(this.form.value), res => this.handleSuccess(res));
  }

  private handleSuccess(result?: Result<string>): void {
    if (result !== undefined && result.data !== null)
      this.#service.setToken(result.data);
    this.#common.goToPage('/home');
  }
}
