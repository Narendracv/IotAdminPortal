import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';

import { User } from '../user.model';
import { UserService } from '../user.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[];
  isLoading: boolean;
  error: string;
  closeSub: Subscription;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    console.log('User LIST INIT');
    this.getUsers();
  }
  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  getUsers() {
    this.isLoading = true;

    const obs: Observable<User[]> = this.userService.GetUsers();

    obs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.users = resData;
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );
  }
  onAddUser() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  OnEdit(id: number) {
    this.router.navigate([`${id}/edit`], { relativeTo: this.route });
  }
  OnDelete(id: number, name: string) {
    this.isLoading = true;
    const deleteSingle = this.userService.DeleteUser(id).subscribe();

    this.getUsers();
    this.isLoading = false;
    console.log('Delete', id);
  }
}
