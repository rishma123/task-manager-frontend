import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor(private readonly router: Router) {}

  canActivate(): boolean {
    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      if (token) return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
