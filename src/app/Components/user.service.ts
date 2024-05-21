import { Injectable } from '@angular/core';
import { user } from './user.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  allUsers  = new BehaviorSubject<user[]>([])

  constructor() { 
    console.log('checking user');
    this.setUserlistToLocal()
  }

  addUser(newUser : user){
    let usersFromLocalStorage = localStorage.getItem('userList');
    if(usersFromLocalStorage){
      let users : user[] = JSON.parse(usersFromLocalStorage);
      users.push(newUser);
      localStorage.setItem('userList',JSON.stringify(users))
      this.allUsers.next(users)
    }
  }

  removeUser(id : number){
    let usersFromLocalStorage = localStorage.getItem('userList');
    if(usersFromLocalStorage){
      let users : user[] = JSON.parse(usersFromLocalStorage);
      users = users.filter(user => user.id !== id)
      localStorage.setItem('userList',JSON.stringify(users))
      this.allUsers.next(users)
    }
  }

  editUser(userToUpdate : user){
    let usersFromLocalStorage = localStorage.getItem('userList');
    if(usersFromLocalStorage){
      let users : user[] = JSON.parse(usersFromLocalStorage);
      for(let i = 0; i<users.length; i++){
        if(users[i].id == userToUpdate.id){
          users[i] = userToUpdate
          break;
        }
      }
      localStorage.setItem('userList',JSON.stringify(users))
      this.allUsers.next(users)
    }
  }

  setUserlistToLocal(){
    if(!localStorage.getItem('userList')){
      let users : user[] = [
        {
          id : 1,
          name : 'Harsh',
          email : 'harshsagarkumar1111@gmail.com',
          mobile : '9097652543'
        },
        {
          id : 2,
          name : 'Sagar',
          email : 'sagar@gmail.com',
          mobile : '1234567890'
        },
        {
          id : 3,
          name : 'user1',
          email : 'user1@gmail.com',
          mobile : '2345678901'
        },
        {
          id : 4,
          name : 'user2',
          email : 'user2@gmail.com',
          mobile : '2345678901'
        },
        {
          id : 5,
          name : 'user4',
          email : 'user4@gmail.com',
          mobile : '2345678901'
        },
        {
          id : 6,
          name : 'user3',
          email : 'user3@gmail.com',
          mobile : '2345678901'
        },
      ]
      localStorage.setItem('userList',JSON.stringify(users))
      this.allUsers.next(users)
    }else{
      console.log('Users exist');
      let usersFromLocalStorage = localStorage.getItem('userList');
      if(usersFromLocalStorage){
        let users : user[] = JSON.parse(usersFromLocalStorage);
        this.allUsers.next(users)
      }
    }
  }
}
