import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';


@Injectable()
export class AccountingEffects {

  constructor(private actions$: Actions) {
    console.log('[RECORDS EFFECTS]');
  }
}
