import { Component, Input } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component( {
    selector: 'app-footer',
    styleUrls: ['./app-footer.component.css'],
    templateUrl: './app-footer.component.html'
})
export class AppFooterComponent {


    constructor(public _playerService:PlayerService) {

    }

}
