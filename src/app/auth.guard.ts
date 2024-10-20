import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  if (inject(AuthService).isLoggedIn === false) {
    console.log("false")
    inject(Router).navigate(['/login']);
    return false;
  } else {
    console.log("reur")
    return true;
  }
};
