import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { environment } from '../environments/environment';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';


//Rutas
import {APP_ROUTING} from './app.routes';

//Servicios
import { JucaboxService } from './services/jucabox.service';
import { LugaresService } from './services/lugares.service';
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
    ...widgets,
    ...pages
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING,
    SimpleNotificationsModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    ...modules
  ],
  providers:
  [ JucaboxService,
    LugaresService,
    Auth,
    AuthGuardService,
    ...services ],
  bootstrap: [AppComponent],
  entryComponents: [ AdditionalWindow ]
})
export class AppModule { }
