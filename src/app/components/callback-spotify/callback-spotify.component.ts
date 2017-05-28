import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';

import {
    HandyOauthStorageKeys,
    HandyOauthStorageService,
    HandyOauthMessageInterface,
    HandyOauthProvidersController,
    HandyOauthProcessProgressEnum
} from 'ng2-handy-oauth';


@Component({
  selector: 'app-callback-spotify',
  template: `
      <div class="container-fluid">
          <span *ngIf="progress === 1 || progress === 2">Logging ...</span>
          <span *ngIf="progress === 3">Redirecting ...</span>
      </div>
  `
})
export class CallbackSpotifyComponent implements OnInit, OnDestroy {

  public progress: number;

      constructor(private userServ: UserService,
          private router: Router,
          private oauthProvidersController: HandyOauthProvidersController,
          private storageServ: HandyOauthStorageService
      ) {

      }

      public ngOnInit() {
          this.progress = HandyOauthProcessProgressEnum.NO;

          //



          this.callbackFlow();

      }

      public ngOnDestroy() {
          this.oauthProvidersController.unsubscribe();
      }

      protected callbackFlow() {

          this.oauthProvidersController.flow((res: HandyOauthMessageInterface) => {
              this.progress = res.progress;
              if (res.hasOwnProperty('response') && res.response.hasOwnProperty('cid')) {

                  this.router.navigate(['/home']);

              } else if (res.hasOwnProperty('error')) {
              
                  this.storageServ.remove(HandyOauthStorageKeys.DATA);
                  this.router.navigate(['/home']);
                  //this.router.navigate(['/demo', 'error', res.error.code]);
              }
          });
      }
    }
