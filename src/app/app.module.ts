import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http,RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { environment } from '../environments/environment';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Ng2HandyOauthModule } from 'ng2-handy-oauth';
import { UiSwitchModule } from 'angular2-ui-switch';
import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {

  return new AuthHttp(new AuthConfig({
		globalHeaders: [{'Content-Type':'application/json'}]
  }), http, options);

}

//Rutas
import {APP_ROUTING} from './app.routes';

//Servicios
import { JucaboxService } from './services/jucabox.service';
import { PlayerService } from './services/player.service';
import { LugaresService } from './services/lugares.service';
import { GlobalService } from './services/global.service';
import {Auth} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { MessagesService } from './services/messages.service';
import { CanActivateGuard } from './services/guard.service';
import { NotificationService } from './services/notification.service';
import { BreadcrumbService } from './services/breadcrumb.service';
import { AdminLTETranslateService } from './services/translate.service';
import { LoggerService } from './services/logger.service';


//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SinfotoPipe } from './pipes/sinfoto.pipe';
import { ArtistaComponent } from './components/artista/artista.component';
import { KeysPipe } from './pipes/keys.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { LugarComponent } from './components/lugar/lugar.component';
import { LugaresComponent } from './components/lugares/lugares.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { AdditionalWindow } from './components/artista/enviarCancion.component';

import { AdditionalWindowPL } from './components/lugar/crearPlaylist.component';
export function createTranslateLoader( http: Http ) {
    return new TranslateStaticLoader( http, '../public/assets/i18n', '.json' );
}

let modules = [
    AlertModule.forRoot(),
    DatepickerModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    TranslateModule.forRoot({
        deps: [Http],
        provide: TranslateLoader,
        useFactory: (createTranslateLoader)
    }),
    ToasterModule
];

import { AppHeaderComponent } from './widgets/app-header';
import { AppFooterComponent } from './widgets/app-footer';
import { MenuAsideComponent } from './widgets/menu-aside';
import { ControlSidebarComponent } from './widgets/control-sidebar';
import { MessagesBoxComponent } from './widgets/messages-box';
import { NotificationBoxComponent } from './widgets/notification-box';
import { TasksBoxComponent } from './widgets/tasks-box';
import { UserBoxComponent } from './widgets/user-box';
import { BreadcrumbComponent } from './widgets/breadcrumb';
import {SelectModule} from 'ng-select';

import { SinfotoAvatarPipe } from './pipes/sinfoto-avatar.pipe';
import { ArtistasService } from './services/artistas.service';
import { LogService } from './services/log.service';
import { FriendsService } from './services/friends.service';
import { FriendDetailService } from './services/friend-detail.service';
import { DateLogPipe } from './pipes/date-log.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { LOCALE_ID } from '@angular/core';
import { AmigoDetalleComponent } from './components/amigo-detalle/amigo-detalle.component';
import { PlaylistService } from './services/playlist.service';
import { CrearlugarComponent } from './components/crearlugar/crearlugar.component';
import { CallbackSpotifyComponent } from './components/callback-spotify/callback-spotify.component';
import { MyDatePickerModule } from 'mydatepicker';

let widgets = [
    AppComponent,
    BreadcrumbComponent,
    AppHeaderComponent,
    AppFooterComponent,
    MenuAsideComponent,
    ControlSidebarComponent,
    MessagesBoxComponent,
    NotificationBoxComponent,
    TasksBoxComponent,
    UserBoxComponent
];

let pages = [
    HomeComponent
    /*,
    PageNumComponent,
    ClientComponent,
    LayoutsAuthComponent,
    LoginComponent,
    RegisterComponent*/
];
let services = [
    UserService,
    BreadcrumbService,
    MessagesService,
    CanActivateGuard,
    NotificationService,
    AdminLTETranslateService,
    LoggerService
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    NavbarComponent,
    SinfotoPipe,
    ArtistaComponent,
    KeysPipe,
    DomseguroPipe,
    LugarComponent,
    LugaresComponent,
    TruncatePipe,
    UsuarioComponent,
        AdditionalWindow,
        AdditionalWindowPL,
    ...widgets,
    ...pages,
    UsuarioComponent,
    SinfotoAvatarPipe,
    DateLogPipe,
    SafeHtmlPipe,
    AmigoDetalleComponent,
    CrearlugarComponent,
    CallbackSpotifyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    SelectModule,
MyDatePickerModule,
UiSwitchModule,

    ReactiveFormsModule,
    Ng2HandyOauthModule.forRoot({
      providers: {
        spotify: {
          clientId: 'da017c536e314c94ab23b3505ad0fc85',
          redirectUrl: 'http://localhost:4200/callback'
        }
      }
    }),
    ...modules
  ],
  providers:
  [ JucaboxService,
    PlayerService,
    LugaresService,
    Auth,
    AuthGuardService,
    LogService,
    ArtistasService,
    FriendsService,
    FriendDetailService,
    GlobalService,
    PlaylistService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    { provide: LOCALE_ID, useValue: "es-ES" },
    ...services ],
  bootstrap: [AppComponent],
  entryComponents: [ AdditionalWindow,AdditionalWindowPL ]
})
export class AppModule { }
