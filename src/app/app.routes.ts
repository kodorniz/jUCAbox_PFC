
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { LugaresComponent } from './components/lugares/lugares.component';
import { LugarComponent } from './components/lugar/lugar.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import {AuthGuardService} from './services/auth-guard.service';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'buscar', component: SearchComponent },
  { path: 'artista/:id', component: ArtistaComponent },
  { path: 'lugares', component: LugaresComponent },
  {
  path: 'usuario', component: UsuarioComponent,
  //canActivate:[ AuthGuardService ]
 },
  { path: 'lugar/:id', component: LugarComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);