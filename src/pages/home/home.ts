import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafariViewController } from '@ionic-native/safari-view-controller';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public publicFlipbookUrl: SafeResourceUrl;
  public flipbookUrl: SafeResourceUrl;
  public showIframe: boolean = true; // Fallback para Android o web
  private publicUrl: string = 'https://www.delportal.com.ec/3d-flip-book/promocion-junio-julio-2025/';

  private rawUrl: string = 'http://localhost/appdelportal/flipbook-viewpage/';
  private browser: InAppBrowserObject;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private safariViewController: SafariViewController,
    private iab: InAppBrowser,
  ) {
    this.flipbookUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.rawUrl);
  }

  // openFlipbook() {
  //   this.navCtrl.push('FlipbookPage');
  // }

  openBrowser() {
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        // iOS
        this.safariViewController.isAvailable().then((available: boolean) => {
          if (available) {
            this.safariViewController.show({
              url: this.publicUrl,
              toolbarColor: "#8BB624",
              transition: 'curl',
              enterReaderModeIfAvailable: false,
            });
            this.showIframe = false;
          } else {
            this.showIframe = true;
          }
        });
      }
      else if (this.platform.is('android')) {
        // Android
        this.browser = this.iab.create(this.publicUrl, '_self', { //se abre en una ventana de Cordova WebView
          location: 'no',
          toolbar: 'no',
          hidenavigationbuttons: 'yes',
          closebuttoncaption: 'Cerrar',
          zoom: 'no',
          fullscreen: 'yes',
          toolbarcolor: '#8BB624',
          toolbarposition: 'top',
          hideurlbar: 'yes',
          lefttoright: 'yes'
        });
        this.showIframe = false;
        this.browser.on('loadstop').subscribe(() => {
          const jsCode = `
            // Crear encabezado
            var header = document.createElement('div');
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.width = '100%';
            header.style.height = '50px';
            header.style.backgroundColor = '#8BB624';
            header.style.color = 'white';
            header.style.display = 'flex';
            header.style.alignItems = 'center';
            header.style.justifyContent = 'center';
            header.style.fontSize = '18px';
            header.style.padding = '0 10px';
            header.style.zIndex = '9999';
            var leftDiv = document.createElement('div');
            var button = document.createElement('button');
            button.id = 'closeBtn';
            button.innerText = 'Cerrar';
            button.style.backgroundColor = '#8BB624';
            button.style.color = 'white';
            button.style.border = 'none';
            button.style.padding = '5px 10px';
            button.style.borderRadius = '5px';
            leftDiv.appendChild(button);

            var centerDiv = document.createElement('div');
            centerDiv.innerText = 'Revista Jun-Jul 2025';
            centerDiv.style.flex = '1';
            centerDiv.style.textAlign = 'center';

            var rightDiv = document.createElement('div');
            rightDiv.style.width = '60px'; // espacio para balance visual

            header.appendChild(leftDiv);
            header.appendChild(centerDiv);
            header.appendChild(rightDiv);

            // Añadir padding al body para no tapar contenido
            document.body.style.paddingTop = '50px';

            // Insertar encabezado
            document.body.prepend(header);


            // Enviar mensaje a la app cuando se haga click en cerrar
            button.addEventListener('click', function() {
              window.location.href = 'https://exit.cerrar/';
                 
            });
          `;
        this.browser.executeScript({ code: jsCode }).then(() => {
            console.log('Encabezado inyectado con éxito');
          }).catch(err => {
            console.log('Error al inyectar encabezado', err);
          });
        });

        this.browser.on('loadstart').subscribe((event: any) => {
          if (event.url.includes('exit.cerrar')) {
            this.browser.close();
          }
        });

      } else {
        // Web
        window.open(this.publicUrl, '_blank', 'location=no,toolbar=no,closebuttoncaption=Cerrar,zoom=no,fullscreen=yes,toolbarcolor=#8BB624,toolbarposition=top,lefttoright=yes');
        // this.showIframe = true;
      }
    });
  }

}
