import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// Importar HttpClientModule
import {HttpClientModule} from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user/user-edit.component';
import { ArtistListComponent } from './components/artist/artist-list.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistAddComponent } from './components/artist/artist-add.component';
import { ArtistEditComponent } from './components/artist/artist-edit.component';
import { ArtistDetailComponent } from './components/artist/artist-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ArtistListComponent,
    HomeComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
