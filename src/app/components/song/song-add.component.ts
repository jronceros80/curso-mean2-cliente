import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Song } from '../../models/song';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
    selector: 'song-add',
    templateUrl: 'song-add.component.html',
    providers: [UserService]
  })
  export class SongAddComponent implements OnInit{

    public titulo: string;
    public song: Song;
    public identity;
    public token;
    public url: string;
    public alertMessage: string;
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
      ){
        this.titulo='Añadir canción';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();  
        this.url = GLOBAL.url;
        this.song = new Song(1,'','','','');
    }

    ngOnInit(){
        console.log('song-add cargado');
      }
    
    onSubmit(){
        this._route.params.forEach((params: Params)=>{
           let album_id = params['album'];
           this.song.album=album_id;  
           console.log(this.song);
           
           /*this._albumService.addAlbum(this.token, this.album).subscribe(
                response =>{
                        if(!response.album){
                            this.alertMessage = 'error en el servidor';
                        }else{
                            this.alertMessage = '!El album se ha creado correctamente';
                            this.album = response.album;
                            this._router.navigate(['/editar-album', response.album._id]);
                        }
                },
                error =>{
                    var errorMessage = <any>error;
                    if(errorMessage != null){
                        var body = JSON.parse(error._body);
                        this.alertMessage = body.message;
                    }
                }
            );*/
        });
    }
  }