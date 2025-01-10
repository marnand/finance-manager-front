import { ApplicationRef, ComponentRef, createComponent, inject, Injectable } from '@angular/core';
import { SnackbarComponent } from '@app/shared/components/snackbar/snackbar.component';
import { SnackbarConfig, SnackbarRef } from '../model/Snackbar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private readonly defaultDuration = 3000;
  private appRef = inject(ApplicationRef);
  private activeSnackbars = new Set<{
    ref: SnackbarRef;
    componentRef: ComponentRef<SnackbarComponent>;
  }>();

  show(config: SnackbarConfig): SnackbarRef {
    const snackbarRef = new SnackbarRef();
    
    // Cria o componente
    const hostElement = document.createElement('div');
    document.body.appendChild(hostElement);

    const componentRef = createComponent(SnackbarComponent, {
      hostElement,
      environmentInjector: this.appRef.injector
    });

    // Configura os dados do snackbar
    componentRef.instance.message = config.message;
    componentRef.instance.type = config.type ?? 'info';
    componentRef.instance.visible = true;

    // Anexa ao Angular change detection
    this.appRef.attachView(componentRef.hostView);

    // Adiciona aos snackbars ativos
    this.activeSnackbars.add({ ref: snackbarRef, componentRef });

    // Configura o timer para fechar
    const closeTimeout = setTimeout(() => {
      this.closeSnackbar(snackbarRef);
    }, config.duration ?? this.defaultDuration);

    snackbarRef.setCloseTimeout(closeTimeout);

    // Inscreve para limpar quando o snackbar for fechado
    snackbarRef.onDestroy
      .pipe()
      .subscribe(() => {
        this.closeSnackbar(snackbarRef);
      });

    return snackbarRef;
  }

  private closeSnackbar(snackbarRef: SnackbarRef) {
    const snackbarData = Array.from(this.activeSnackbars)
      .find(data => data.ref === snackbarRef);

    if (snackbarData) {
      const { componentRef } = snackbarData;
      
      // Inicia a animação de saída
      componentRef.instance.visible = false;

      // Aguarda a animação terminar antes de destruir
      setTimeout(() => {
        componentRef.instance.hostElement?.remove();
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
        this.activeSnackbars.delete(snackbarData);
      }, 200);
    }
  }
}