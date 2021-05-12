import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioLoginBody } from '../../shared/Types';

import { LoginService } from '../../shared/services/login.service';
import { UserService } from '../../shared/services/user.service';
import { Variables } from 'src/app/shared/variables';
import { Funciones } from 'src/app/shared/funciones';

import { sp } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/site-users/web';

export interface User {
  name: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });
  usuario: UsuarioLoginBody = {
    Usuario: '',
    Key: '',
    Id_Usuario: '',
    Tipo: 0,
    FechaModifica: Funciones.dateFormatMMDDYY(new Date()),
    FechaRegistro: Funciones.dateFormatMMDDYY(new Date()),
    UsuarioModifica: '',
    UsuarioRegistro: '',
  };
  noRegisteredUser: boolean = true;

  constructor(
    // private messageService:MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  async login() {
    this.usuario.Usuario = this.user.get('username').value;
    this.usuario.Key = this.user.get('password').value;
    this.usuario.Id_Usuario = 'xternal';
    this.usuario.Tipo = 1;
    this.usuario.UsuarioRegistro = this.usuario.Usuario;
    this.usuario.UsuarioModifica = this.usuario.Usuario;

    let user = await sp.web.currentUser();

    if (user) {
      this.noRegisteredUser = false;
      this.userService.obtenerUsuario(this.usuario.Usuario).then((usuarios) => {
        if (usuarios) {
          let element = usuarios.find(
            (element) => element.email === this.usuario.Usuario
          );
          if (element !== undefined) {
            this.loginService.setUserLogged(element);
            sessionStorage.setItem('usuarioLogged', JSON.stringify(element));
            this.router.navigate([Variables.path.home]);
          }
        }
      });
    } else {
      this.noRegisteredUser = true;
    }
  }
}
