import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {RegistrationComponent} from '../../registration/registration.component';
import {MessagesService} from '../../core/services/messages.service';
import {Observable, of} from 'rxjs';


@Injectable()
export class CanDeactivateGuard implements CanDeactivate<RegistrationComponent> {

  constructor(private msgService: MessagesService) {
  }

  canDeactivate(component: RegistrationComponent): Observable<boolean> {
    if (component.editInProgress) {
      this.msgService.setMessage({
        type: 'warning',
        body: 'Are you sure to leave the registration form?',
        action: true
      });
      return this.msgService.getSubmit();
    }
    return of(true);
  }

}
