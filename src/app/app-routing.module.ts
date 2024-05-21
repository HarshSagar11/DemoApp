import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { ListUserComponent } from './Components/list-user/list-user.component';

const routes: Routes = [
  {path : '', component : ListUserComponent},
  {path : 'create',component : CreateUserComponent },
  {path : 'edit/:id',component : CreateUserComponent },
  {path : 'list',component : ListUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
