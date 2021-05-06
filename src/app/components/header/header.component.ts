import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  NavigationStart,
  RoutesRecognized,
  ActivationStart,
} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  history = [];

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    //this._location.back();
    let url = this.getPreviousUrl();
    this.deleteLastCountUrl(2);
    this.router.navigate([url]);
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '/home';
  }

  public deleteLastCountUrl(count: number): void {
    for (let i = 0; i < count; i++) {
      this.history.pop();
    }
    sessionStorage.setItem('history', JSON.stringify(this.history));
  }

}
