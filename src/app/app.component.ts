import { Component } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Academic-Management-System';
  loading=false;
  constructor(private router: Router,private spinner: NgxSpinnerService) {

    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.spinner.show('route-loader-spinner');
      }

      if (routerEvent instanceof NavigationEnd) {
        this.spinner.hide('route-loader-spinner');
      }

      if (routerEvent instanceof NavigationError) {
        this.spinner.hide('route-loader-spinner');
      }

      if (routerEvent instanceof NavigationCancel) {
        this.spinner.hide('route-loader-spinner');
      }
    });
  }

}
