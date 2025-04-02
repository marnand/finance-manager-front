import { type HttpErrorResponse } from '@angular/common/http';
import { computed, inject, signal, type Signal } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';
import { Result } from './Result';

export class State<T> {
  #snackbar = inject(SnackbarService);

  private readonly state = signal<{
    data: Result<T> | null;
    loading: boolean;
  }>({
    data: null,
    loading: false
  })

  private readonly destroy$ = new Subject<void>();

  readonly data: Signal<Result<T> | null> = computed(() => this.state().data);
  readonly loading: Signal<boolean> = computed(() => this.state().loading);

  constructor(source$?: Observable<T>) {
    if (source$) this.connect(source$);
  }

  connect<R = T>(source$: Observable<R>, onSuccess?: (data?: R) => void): this {
    this.reset()
    this.state.update(state => ({ ...state, loading: true }))

    source$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (onSuccess) onSuccess(response)

        this.state.set({
          data: response as unknown as Result<T>,
          loading: false
        })
      },
      error: (error: HttpErrorResponse) => {
        const resultError = error.error
        this.state.set({
          data: resultError,
          loading: false
        })
        
        const message = resultError?.message ?? resultError.error?.message ?? "Erro ao realizar a requisição."
        this.#snackbar.show({ message: message, type: 'error' })
      }
    })

    return this
  }

  reset(): this {
    this.state.set({
      data: null,
      loading: false
    });
    return this;
  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}