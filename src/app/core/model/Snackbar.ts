import { Subject } from "rxjs";

export type SnackbarType = 'success' | 'error' | 'info' | 'warning';

export interface SnackbarConfig {
  message: string;
  type?: SnackbarType;
  duration?: number;
}

export class SnackbarRef {
  private destroy$ = new Subject<void>();
  private closeTimeout: any;

  setCloseTimeout(timeout: any) {
    this.closeTimeout = timeout;
  }

  close(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  get onDestroy() {
    return this.destroy$.asObservable();
  }
}