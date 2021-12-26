import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { HeaderComponent } from './header/header.component';
import { OrganizationComponent } from './admin/organization/organization.component';
import { BranchComponent } from './admin/branch/branch.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SearchComponent } from './search-asset/search/search.component';
import { UserComponent } from './users/user/user.component';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './authentication/logout/logout.component';
import { AuthInterceptorService } from './authentication/authInterceptor.service';
import { AddUserComponent } from './users/add-user/add-user.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';

import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { EnvServiceProvider } from './service/env.service.provider';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,

    OrganizationComponent,
    BranchComponent,
    DashboardComponent,
    SearchComponent,
    UserComponent,
    LogoutComponent,
    AddUserComponent,
    LoadingSpinnerComponent,

    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  exports: [LoadingSpinnerComponent, AlertComponent, PlaceholderDirective],
  entryComponents: [AlertComponent],
  providers: [
    EnvServiceProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
