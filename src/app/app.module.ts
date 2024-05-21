import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { ListUserComponent } from './Components/list-user/list-user.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTooltipModule } from '@angular/material/tooltip';  
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SortPipe } from './shared/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    ListUserComponent,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTooltipModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    provideAnimationsAsync(),
    SortPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
