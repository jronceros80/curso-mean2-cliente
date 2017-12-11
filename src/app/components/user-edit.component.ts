import { Component, OnInit } from '@angular/core';
import {User } from '../models/user';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';


@Component({
  selector: 'user-edit',
  templateUrl: '../views/user-edit.html',
  providers: [UserService]
})
export class UserEditComponent implements OnInit{

    public titulo: string;
    public user: User;
    public identity;
    public token;
    public alertMessage;
    public url: string;
    
    constructor(
        private _userService: UserService
      ){
        this.titulo='Actualiza tus datos';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();  
        this.user = this.identity;
        this.url = GLOBAL.url;
      }

    ngOnInit(){
      console.log('user-edit cargado');
    }

    onSubmit(){
        this._userService.updateUser(this.user).subscribe(
            response =>{
                if(!response.user){
                    this.alertMessage = 'El usuario no ha sido actualizado';
                }else{
                    //Actualizamos los datos de la sesion del usuario
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    document.getElementById('userName').innerHTML = this.user.name;

                    //Si hay imagines a subir lo guardamos
                    if(!this.fileToUpload){
                        //Redireccion
                    }else{
                        this.makeFileRequest(this.url + 'upload-image-user/' +  this.user._id, [], this.fileToUpload)
                            .then((result: any) => {
                                this.user.image = result.image;
                                localStorage.setItem('identity', JSON.stringify(this.user));
                                
                                let image_file= this.url + 'get-image-file/' + this.user.image;
                                document.getElementById('imageUpload').setAttribute('src', image_file);
                            });
                    }

                    //Mostramos un mensaje satisfactorio
                    this.alertMessage = 'Datos actualizados correctamente';

                    
                }
            },
            error =>{
                var errorMessage = <any>error;
                var body = JSON.parse(error._body);
                this.alertMessage = body.message;
            }

        );
    }

    public fileToUpload: Array<File>;
    
    fileChangeEvent(fileInput: any){
        this.fileToUpload = <Array<File>>fileInput.target.files;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>){
        var token = this.token;

        return new Promise(function(resolve, reject){
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i=0; i<files.length; i++){
                formData.append('image', files[i], files[i].name)
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    }
}