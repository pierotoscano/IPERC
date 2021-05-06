import { Component } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // esMiembroDocumentOwnersGroup: boolean;
  // esMiembroGrupoAdministradores: boolean;
  // title = 'aplicacion';
  // history = [];
  // public spinkit = Spinkit;
/*
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  constructor(private _location: Location, public router: Router) {
    this.esMiembroDocumentOwnersGroup = true;
    this.esMiembroGrupoAdministradores = true;
  }
*/
  ngOnInit(): void {
    // this.loadRouting();
    //jquery("#body").val('');
  }
/*
  obtenerMaestrosYDatos(): Promise<boolean> {
    const d: Deferred<boolean> = new Deferred<boolean>();

    return d.promise;
  }

  goBack() {
    //this._location.back();
    let url = this.getPreviousUrl();
    this.deleteLastCountUrl(2);
    this.router.navigate([url]);
  }

  goBackBrowser() {
    //this._location.back();
    let url = this.getLastUrl();
    this.deleteLastCountUrl(3);
    window.sessionStorage.removeItem('back_browser');
    //this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    //this.router.navigate([url]));
    window.location.reload();
  }

  public loadRouting(): void {
    this.history = JSON.parse(sessionStorage.getItem('history'));
    if (this.history == null) {
      this.history = [];
    }
    $(window).on('popstate', function () {
      // console.log('Back button browser');
      window.sessionStorage.setItem('back_browser', 'true');
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects];
        sessionStorage.setItem('history', JSON.stringify(this.history));
        // console.log(this.getHistory());
        let back_browser = window.sessionStorage.getItem('back_browser');
        if (back_browser == 'true') {
          this.goBackBrowser();
        }
      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '/home';
  }

  public getLastUrl(): string {
    return this.history[this.history.length - 1] || '/home';
  }

  public deleteLastCountUrl(count: number): void {
    for (let i = 0; i < count; i++) {
      this.history.pop();
    }
    sessionStorage.setItem('history', JSON.stringify(this.history));
  }
  */
}
