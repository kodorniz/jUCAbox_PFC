import { Component, Input } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import {Auth} from '../../services/auth.service';


@Component( {
    selector: 'app-header',
    styleUrls: ['./app-header.component.css'],
    templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

  constructor(private auth: Auth
  ) {
    // TODO
  }


}
