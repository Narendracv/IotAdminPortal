import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from './admin/branch/branch.component';
import { OrganizationComponent } from './admin/organization/organization.component';
import { AuthGuard } from './authentication/auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SearchComponent } from './search-asset/search/search.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserComponent } from './users/user/user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'auth', component: LoginComponent },
  {
    path: 'organizations',
    component: OrganizationComponent,
    canActivate: [AuthGuard],
  },
  { path: 'branches', component: BranchComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'users/new', component: AddUserComponent, canActivate: [AuthGuard] },
  {
    path: 'users/:id/edit',
    component: AddUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/:id/delete',
    component: UserComponent,
    canActivate: [AuthGuard],
  },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'search', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
