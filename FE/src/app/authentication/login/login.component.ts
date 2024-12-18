import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm! : FormGroup;

  constructor(private fb : FormBuilder, private service : UserService){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: "",
      password: "",
    })
  }

  onSubmit(){
    let value = this.loginForm.value;
    this.service.login(value.userName, value.password);
  }
}
