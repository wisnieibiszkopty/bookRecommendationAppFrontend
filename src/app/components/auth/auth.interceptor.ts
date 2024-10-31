import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {UserService} from '../../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const userService = inject(UserService);
  const token = userService.getToken();

  console.log(token);

  if(token === ''){
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token
    }
  });

  return next(authReq);
};
