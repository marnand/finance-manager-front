import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { HeaderComponent } from '@components/header/header.component';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  serv = inject(LoginService);

  form: FormGroup;
  isRegisterMode = false; // Alterna entre login e registro

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
      },
      { validators: this.passwordsMatchValidator }
    );

    this.serv.getUsers().subscribe(r => console.log(r));
  }

  // Validação personalizada para confirmar senhas
  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword || !this.isRegisterMode
      ? null
      : { passwordMismatch: true };
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;

    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isRegisterMode) {
        console.log('Registrar:', this.form.value);
      } else {
        console.log('Login:', this.form.value);
      }
    } else {
      console.log('Formulário inválido');
    }
  }
}
