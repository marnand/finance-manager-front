import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { State } from '@app/core/model/State';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { Common } from '@app/core/utils/common';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { RegistrationDTO } from './dto/RegisterDTO';
import { RegisterService } from './service/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {
  #fb = inject(FormBuilder);
  #service = inject(RegisterService);
  #common = inject(Common);
  #snackbar = inject(SnackbarService);

  state = new State<Number>();

  form = this.#fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: [this.passwordsMatchValidator] }
  );

  ngOnInit(): void { }

  ngOnDestroy = (): void => this.state.destroy();

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  goToLogin() {
    this.form.reset();
    this.#common.goToPage('/login');
  }

  onSubmit() {
    if (!this.form.valid) {
      this.#snackbar.show({ message: 'Campos inválidos.', type: 'error' });
      return;
    }

    const param: RegistrationDTO = {
      Name: this.form.get("name")?.value ?? '',
      Email: this.form.get("email")?.value ?? '',
      Pass: this.form.get("password")?.value ?? ''
    };

    this.state.connect(this.#service.register(param), () => this.handleSuccess());
  } 

  private handleSuccess() {
    this.#snackbar.show({ message: 'Usuário salvo com sucesso.', type: 'success' });

    setTimeout(() => {
      this.goToLogin();
    }, 2000);
  }
}
