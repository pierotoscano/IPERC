export const environment = {
  production: true,
  /*webRelativeUrl: '/sites/yanbalappsdesa/productosnuevos',
  proxyUrl: 'https://uniqueyanbal.sharepoint.com',
  cdnUrl: 'https://uniqueyanbal.sharepoint.com/sites/corporacion/cdn',
  paredUrl: 'https://uniqueyanbal.sharepoint.com/sites/yanbalappsdesa/productosnuevos/pared/',
*/
appPage: '/SitePages/app.aspx/',
cdnUrl: 'https://gruporocio.sharepoint.com/sites/CatalogoG',
paredUrl: 'https://gruporocio.sharepoint.com/sites/CatalogoG',
proxyTenant: 'https://gruporocio.sharepoint.com',
proxyUrl: 'https://gruporocio.sharepoint.com',
webRelativeUrl: '/sites/CatalogoG',
sitePared: 'pared',
urlForDownloadTest: 'https://gruporocio.sharepoint.com',

  getRutaBase() {
    return environment.proxyTenant + environment.webRelativeUrl;
  },
  getRutaBaseApp() {
    let rutaBase = '';
    // debugger;
    if (this.production) {
      rutaBase =
        environment.proxyTenant +
        environment.webRelativeUrl +
        environment.appPage;
    } else {
      rutaBase = environment.proxyTenant + '/';
    }

    return rutaBase;
  },
  getRutaParedApp() {
    let rutaBase = '';

    if (this.production) {
      rutaBase = environment.paredUrl;
    } else {
      rutaBase =
        environment.proxyUrl +
        environment.webRelativeUrl +
        '/' +
        environment.sitePared;
    }

    return rutaBase;
  },
};
