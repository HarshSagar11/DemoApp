import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { user } from '../user.interface';
import { SortPipe } from '../../shared/sort.pipe';
declare var $ : any;

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {
  allusers : user[] = [];
  currentPage = 1;
  pageSize = 3
  sortDirection : string = 'asc'
  usertoDelete: any;
  constructor(private userService : UserService, private sortPipe : SortPipe){
  }
  ngOnInit(){
    this.userService.allUsers.subscribe(user =>{
      this.allusers = user;
    })
    console.log(this.allusers)
  }
  openModalforDelete(id : any){
    this.usertoDelete = this.allusers.filter(ele => ele.id == id)[0]
    $('#deleteModal').modal('show')
  }
  deleteUser(){
    this.userService.removeUser(this.usertoDelete.id)
    $('#deleteModal').modal('hide')
  }
  orderColumn(column : string){
    if(this.sortDirection == 'asc'){
      this.sortDirection = 'desc'
    }
    else if(this.sortDirection == 'desc'){
      this.sortDirection = 'asc'
    }
    else{
      this.sortDirection = 'desc'
    }
    let users : user[] = this.allusers.slice(((this.currentPage-1)*this.pageSize), this.currentPage*this.pageSize);
    users = this.sortPipe.transform(
      users,
      this.sortDirection,
      column
    )
    this.allusers.splice(((this.currentPage-1)*this.pageSize),this.pageSize,...users);
  }
}
