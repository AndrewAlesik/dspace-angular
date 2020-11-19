import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { returnEndUserAgreementUrlTreeOnFalse } from '../shared/operators';

/**
 * An abstract guard for redirecting users to the user agreement page if a certain condition is met
 * That condition is defined by abstract method hasAccepted
 */
export abstract class AbstractEndUserAgreementGuard implements CanActivate {

  constructor(protected router: Router) {
  }

  /**
   * True when the user agreement has been accepted
   * The user will be redirected to the End User Agreement page if they haven't accepted it before
   * A redirect URL will be provided with the navigation so the component can redirect the user back to the blocked route
   * when they're finished accepting the agreement
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.hasAccepted().pipe(
      returnEndUserAgreementUrlTreeOnFalse(this.router, state.url)
    );
  }

  /**
   * This abstract method determines how the User Agreement has to be accepted before the user is allowed to visit
   * the desired route
   */
  abstract hasAccepted(): Observable<boolean>;

}