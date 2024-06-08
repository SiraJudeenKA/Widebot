import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';

export const authGuard: CanActivateChildFn = () => {
    /**
     * Variable used to create the instance of user serivce
     */
    const userService = inject(UsersService);
    /**
     * Variable used to create the instance of router
     */
    const router = inject(Router);
    if (userService?.currentUserDetails)
        return true;
    else
        return router.createUrlTree(['']);
};
