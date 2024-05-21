import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../user.service';
import { v4 as uuid } from 'uuid';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../user.interface';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  userForm : any;
  isEdit : boolean = false;
  userId : any;
  allUsers : user[]= [];
  currentUser!: user;

  constructor (private userService :  UserService, private activatedRoute : ActivatedRoute, private router : Router){
    let currentUrl = this.router.url;
    if(currentUrl.includes('edit')){
      this.isEdit = true;
    }
  }
  ngOnInit(){
    this.userService.allUsers.subscribe(users=>{
      this.allUsers = users;
    })
    this.initForm();
    if(this.isEdit){
      this.userId = this.activatedRoute.snapshot.paramMap.get('id')
      this.currentUser = this.allUsers.filter(ele=>ele.id == this.userId)[0]
      if(this.currentUser){
        this.userForm.patchValue({
          name : this.currentUser.name,
          email : this.currentUser.email,
          mobile : this.currentUser.mobile,
        })
      }
      else{
        this.router.navigate(['create'])
      }
    }
    console.log(this.isEdit)
  }

  initForm(){
    this.userForm = new FormGroup({
      name : new FormControl('',[Validators.required, Validators.pattern('[a-zA-z0-9 ]*')]),
      email : new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z0-9._-]+@[a-zA-Z0-9.]+[.]+[a-zA-Z]{2,4}')]),
      mobile : new FormControl('',[Validators.required, Validators.pattern('[0-9]{10}')]),
    })
  }

  submitForm(){
    if(this.userForm.valid){
      let payload : user  = {
        id : this.isEdit ? this.currentUser.id : uuid(),
        name : this.userForm.get('name').value,
        email : this.userForm.get('email').value,
        mobile : this.userForm.get('mobile').value,
      }
      if(this.isEdit){
        this.userService.editUser(payload);
      }
      else{
        this.userService.addUser(payload)
      }
      this.router.navigate([''])
    }
  }
}
