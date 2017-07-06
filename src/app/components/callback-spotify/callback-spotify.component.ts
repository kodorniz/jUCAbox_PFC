import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import {GlobalService} from '../../services/global.service';

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
  public url:string='';
      constructor(private _globalService:GlobalService, private userServ: UserService,
          private router: Router,
          private oauthProvidersController: HandyOauthProvidersController,
          private storageServ: HandyOauthStorageService
      ) {
        this.url = _globalService.getCallbackurl();

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
        console.log('callback');
          this.oauthProvidersController.flow((res: HandyOauthMessageInterface) => {
              this.progress = res.progress;
              console.log(res,res.response);
              if (res.hasOwnProperty('response') && res.response.hasOwnProperty('cid')) {
                console.log('url',this.url);
                  this.router.navigate([this.url]);

              } else if (res.hasOwnProperty('error')) {

                  this.storageServ.remove(HandyOauthStorageKeys.DATA);
                  console.log('url',this.url);
                  this.router.navigate([this.url]);
                  //this.router.navigate(['/demo', 'error', res.error.code]);
              }
          });
      }
    }
