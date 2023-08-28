import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageHeaderComponent } from './component/page-header/page-header.component';
import { PageFooterComponent } from './component/page-footer/page-footer.component';
import { MaterialModule } from './material/material.module';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { BookComponent } from './component/book/book.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { OrderComponent } from './component/order/order.component';
import { OrdersComponent } from './component/orders/orders.component';
import { ReturnBookComponent } from './component/return-book/return-book.component';
import { UsersListComponent } from './component/users-list/users-list.component';
import { ManageBooksComponent } from './component/manage-books/manage-books.component';
import { ManageCategoriesComponent } from './component/manage-categories/manage-categories.component';
import { ProfileComponent } from './component/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    SideNavComponent,
    BookComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    OrderComponent,
    OrdersComponent,
    ReturnBookComponent,
    UsersListComponent,
    ManageBooksComponent,
    ManageCategoriesComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
      tokenGetter: () => {
        return localStorage.getItem('access_token');
      },
      allowedDomains: ['localhost:7285'],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
