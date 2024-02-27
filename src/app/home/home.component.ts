import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  signupUsers: any[] = [];
  signupObj:any = {
    userName:'',
    email: '',
    password: '',
  };
  loginObj: any = {
    userName:'',
    password: '',
  };

  constructor(private router: Router){}

  ngOnInit():void{
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null){
      this.signupUsers = JSON.parse(localData);
    }
  }
  onSignUp(){
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers',JSON.stringify(this.signupUsers));
    this.signupObj = {
      userName: '',
      email: '',
      password: ''
    };
  }
  onLogin(){
    const isUserExist = this.signupUsers.find(m => m.userName == this.loginObj.userName &&  m.password == this.loginObj.password);
    if(isUserExist != undefined){
      alert('Login Bem sucedido');
      this.router.navigate(['LocalizacaoByCity']);
    } else {
      alert('Login incorreto')
    }
  }

}
