import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserService} from '../../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  const isLoggedIn = userService.getLoggedIn();

  return isLoggedIn ? isLoggedIn : router.createUrlTree(['/','books']);
};
