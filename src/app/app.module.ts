import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SimpleNotificationsModule } from 'angular2-notifications';

//Rutas
import {APP_ROUTING} from './app.routes';

//Servicios
import { JucaboxService } from './services/jucabox.service';
import { LugaresService } from './services/lugares.service';

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
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING,
    SimpleNotificationsModule.forRoot()
  ],
  providers:
  [ JucaboxService, LugaresService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
