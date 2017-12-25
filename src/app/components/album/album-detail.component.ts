import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Album } from '../../models/album';
import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'album-detail',
    templateUrl: 'album-detail.component.html',
    providers: [UserService, AlbumService]
  })
  export class AlbumDetailComponent implements OnInit{
    public album: Album;
    public identity;
    public token;
    public url: string;
    public alertMessage: string;
    public albums;
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _albumService: AlbumService
      ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();  
        this.url = GLOBAL.url;
        this.album = new Album('','',2017,'','');
      }

    ngOnInit(){
        console.log('album-detail cargado');

        //Obtenemos el album de la bbdd
        this.getAlbum();
      }

    getAlbum(){
        this._route.params.forEach((params: Params) =>{
            let id = params['id'];

            this._albumService.getAlbum(this.token, id).subscribe(
                response =>{
                    if(!response.album){
                        this._router.navigate(['/']);
                    }else{
                        this.album = response.album;

                        //obtener los albunes del artista
                        /*this._albumService.getAlbums(this.token, response.artist._id).subscribe(
                            response =>{
                                if(!response.albums){
                                    this.alertMessage='Este artista no tiene albunes';
                                }else{
                                    this.albums = response.albums;
                                }
                            },
                            error =>{
                                var errorMessage = <any>error;
                                if(errorMessage != null){
                                    var body = JSON.parse(error._body);
                                }
                            }
                        );*/ 
                    }
            },
            error =>{
                var errorMessage = <any>error;
                if(errorMessage != null){
                    var body = JSON.parse(error._body);
                }
            });
        });
    }
  
  }