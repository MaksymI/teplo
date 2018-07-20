import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { CanComponentDeactivate } from '../interfaces/can-component-deactivate.interface';


@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate) {
      console.log('CanDeactivate Guard is called ', component);
      return component.canDeactivate();
    }
}
