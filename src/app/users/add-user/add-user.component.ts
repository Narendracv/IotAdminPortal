import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  @ViewChild('f', { static: false }) userForm: NgForm;
  title: string = 'Add User';
  id: number = 0;
  user: User;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.loadUser();

        // this.userForm.setValue({
        //   name: this.userService.userSelected.name,
        //   email: this.userService.userSelected.email,
        //   password: this.userService.userSelected.passwordHash,
        //   username: this.userService.userSelected.username,
        //   phone: this.userService.userSelected.phone,
        // });
      }
    });
  }
  loadUser() {
    this.userService.GetUser(this.id).subscribe((data) => {
      this.userForm.setValue({
        name: data.name,
        email: data.email,
        password: data.passwordHash,
        username: data.username,
        phone: data.phone,
      });
    });
  }
  onSubmit(form: NgForm) {
    const formData = form.value;
    const userToSave = {
      ...(this.id > 0 && { id: this.id }), //conditonally add property
      name: formData.name,
      email: formData.email,
      username: formData.username,
      passwordHash: formData.password,
      phone: formData.phone,
      branchID: 7,
      roleId: 2,
    } as User;
    if (this.id > 0) {
      console.log('Updating user', userToSave);
      this.userService.UpdateUser(userToSave).subscribe();
    } else {
      console.log('creating user', userToSave);
      this.userService.SaveUser(userToSave).subscribe();
    }
    this.router.navigate(['users']);
    this.userForm.reset();
  }
  onCancel() {
    this.userForm.reset();
    this.router.navigate(['users']);
  }
}
