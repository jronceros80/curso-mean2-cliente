import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Artist } from '../../models/artist';
import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'artist-detail',
    templateUrl: 'artist-detail.component.html',
    providers: [UserService, ArtistService]
  })
  export class ArtistDetailComponent implements OnInit{
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public alertMessage: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService
      ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('', '', '');
      }

    ngOnInit() {
        console.log('artist-add cargado');

        // Llamar almetodo del api para sacar un artista en base a su getArtist
        this.getArtist();
      }

    getArtist() {
        this._route.params.forEach((params: Params) =>{
            const id = params['id'];

            this._artistService.getArtist(this.token, id).subscribe(
                response => {
                    if (!response.artist) {
                        this._router.navigate(['/']);
                    }else {
                        this.artist = response.artist;

                        // obtener los albunes del artista
                    }
            },
            error => {
                const errorMessage = <any>error;
                if (errorMessage != null) {
                    const body = JSON.parse(error._body);
                }
            });
        });
    }
  }