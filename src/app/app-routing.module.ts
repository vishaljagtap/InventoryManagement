import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './component/book/book.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { OrderComponent } from './component/order/order.component';
import { AuthorizationGuard } from './guards/authorization.guard';
import { OrdersComponent } from './component/orders/orders.component';
import { ReturnBookComponent } from './component/return-book/return-book.component';
import { UsersListComponent } from './component/users-list/users-list.component';
import { ManageBooksComponent } from './component/manage-books/manage-books.component';
import { ManageCategoriesComponent } from './component/manage-categories/manage-categories.component';
import { ProfileComponent } from './component/profile/profile.component';

const routes: Routes = [
  {
    path: 'books/library',
    component: BookComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'inventory/dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'users/order',
    component: OrderComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'users/all-orders',
    component: OrdersComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'books/return',
    component: ReturnBookComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'users/list',
    component: UsersListComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'books/maintenance',
    component: ManageBooksComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'books/categories',
    component: ManageCategoriesComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'users/profile',
    component: ProfileComponent,
    canActivate: [AuthenticationGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
