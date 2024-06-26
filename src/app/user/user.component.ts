import {Component, OnInit} from '@angular/core';
import {User} from "../user";
import {UserService} from "../service/user.service";
import {CommonModule} from "@angular/common";
import {NotificationService} from "../service/notification.service";
import {NotificationStatus} from "../notification-status";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  users: User[] = [];

  constructor(private userService: UserService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log(`User with ID ${userId} deleted.`);
        this.loadUsers();

        this.notificationService.show('User deleted successfully', NotificationStatus.Success);
      },
      (error) => {
        console.error(`Error deleting user with ID ${userId}:`, error);

        this.notificationService.show('Error deleting user', NotificationStatus.Fail);
      }
    );
  }
}
