import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Result } from '@app/core/model/Result';
import { State } from '@app/core/model/State';
import { Common } from '@app/core/utils/common';
import { MonetaryPipe } from '@app/shared/pipes/MonetaryPipe';
import { Create } from '../transaction/entities/Model';
import { TransactionService } from '../transaction/service/transaction.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [DatePipe, MonetaryPipe]
})
export class HomeComponent implements OnInit {
  #common = inject(Common)
  #service = inject(TransactionService)

  state = new State<Array<Create>>()
  expenseMonth = signal({ amount: 0, count: 0 })
  incomeMonth = signal({ amount: 0, count: 0 })
  subTotal = computed(() => this.incomeMonth().amount - this.expenseMonth().amount)
  data = computed(() => this.state.data()?.data?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) ?? [])

  ngOnInit(): void {
    this.getTransactions()
  }

  goToNewTransaction = () => this.#common.goToPage('/nova-transacao')

  getTransactions() {
    this.state.connect(this.#service.getBy(), res => this.handleSuccess(res as Result<any>))
  }

  private handleSuccess(res: Result<any>) {
    this.expenseMonth.update(() => this.handleTransaction(res?.data, 'expense'))
    this.incomeMonth.update(() => this.handleTransaction(res?.data, 'income'))
  }

  private handleTransaction(arr: [], type: 'income' | 'expense') {
    const result = { amount: 0, count: 0 }
    arr.forEach((d: any) => {
      if (d.type === type) {
        result.amount += d.amount
        result.count += 1
      }
    })
    return { amount: result.amount, count: result.count }
  }
}
