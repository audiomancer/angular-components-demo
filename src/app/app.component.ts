import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  styles: [
    `
      * {
        font-family: verdana;
      }
    `,
  ],
})
export class AppComponent {
  title = 'angular-components-demo';
}
