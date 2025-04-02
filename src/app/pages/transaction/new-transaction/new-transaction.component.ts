import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { State } from '@app/core/model/State';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { Common } from '@app/core/utils/common';
import { ButtonComponent } from '@s-components/button/button.component';
import { Create } from '../entities/Model';
import { TransactionService } from '../service/transaction.service';

@Component({
  standalone: true,
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  imports: [ReactiveFormsModule, ButtonComponent]
})
export class NewTransactionComponent implements OnInit {
  #common = inject(Common);
  #snackbar = inject(SnackbarService);
  #service = inject(TransactionService);
  fb = inject(FormBuilder);

  state = new State<Number>();
  
  form = this.fb.group({
    type: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(0.01)]],
    date: ['', Validators.required]
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((e:any) => {
      if (e.type === 'expense') {
        console.log(e)
      }
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.#snackbar.show({ message: 'Campos inválidos.', type: 'error' })
      return
    }

    const date = this.form.get('date')?.value ?? ''

    if (this.form.valid) {
      const body: Create = {
        type: this.form.get('type')?.value ?? '',
        description: this.form.get('description')?.value ?? '',
        category: this.form.get('category')?.value ?? '',
        amount: this.form.get('amount')?.value ? Number(this.form.get('amount')?.value) : 0,
        date: date === '' ? new Date() : new Date(date)
      }

      this.state.connect(this.#service.create(body), () => {
        this.handleSuccess()

        setTimeout(() => {
          this.goBack()
        }, 2000)
      })
    }
  }

  goBack = () => this.#common.goToPage('/home')

  private handleSuccess() {
    this.#snackbar.show({ message: 'Transação salva com sucesso!', type: 'success' });

    // setTimeout(() => {
    //   this.goToLogin();
    // }, 2000);
  }
}
