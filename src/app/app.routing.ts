import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user/user-edit.component';
import { ArtistListComponent } from './components/artist/artist-list.component';
import { ArtistAddComponent } from './components/artist/artist-add.component';
import { ArtistEditComponent } from './components/artist/artist-edit.component';
import { ArtistDetailComponent } from './components/artist/artist-detail.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'artistas/:page', component: ArtistListComponent},
    {path: 'crear-artista', component: ArtistAddComponent},
    {path: 'editar-artista/:id', component: ArtistEditComponent},
    {path: 'artista/:id', component: ArtistDetailComponent},
    {path: 'mis-datos', component: UserEditComponent},
	{path: '**', component: ArtistListComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);