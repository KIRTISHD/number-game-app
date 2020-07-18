import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable( { providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor( private router: Router, private userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        if (this.userService.verifyStorage()) {
            return true;
        }
        else{
            this.router.navigate(['/']);
            return false;
        }
    }

}
