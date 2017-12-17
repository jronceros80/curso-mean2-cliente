import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Artist } from '../../models/artist';
import { Album } from '../../models/album';
import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'album-edit',
    templateUrl: 'album-add.component.html',
    providers: [UserService, AlbumService]
  })
  export class AlbumEditComponent implements OnInit{

    public titulo: string;
    public artist: Artist;
    public album: Album;
    public identity;
    public token;
    public url: string;
    public alertMessage: string;
    public is_edit;
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _albumService: AlbumService
      ){
        this.titulo='Editar album';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();  
        this.url = GLOBAL.url;
        this.artist = new Artist('','','');
        this.album = new Album('','',2017,'','');
        this.is_edit=true;
    }

    ngOnInit(){
        console.log('album-add cargado');
      }
    
    onSubmit(){
        this._route.params.forEach((params: Params)=>{
           let artist_id = params['artist'];
           this.album.artist=artist_id;  
           
           this._albumService.addArtist(this.token, this.album).subscribe(
                response =>{
                        if(!response.album){
                            this.alertMessage = 'error en el servidor';
                        }else{
                            this.alertMessage = '!El album se ha creado correctamente';
                            this.album = response.album;
                            //this._router.navigate(['/editar-artista', response.artist._id]);
                        }
                },
                error =>{
                    var errorMessage = <any>error;
                    if(errorMessage != null){
                        var body = JSON.parse(error._body);
                        this.alertMessage = body.message;
                    }
                }
            );
        });
    }
  }