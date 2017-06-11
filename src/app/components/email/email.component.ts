import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user-service.service';
import { EmailService } from './email.service';
import { Template } from './template';
import { templateNamesMessages } from './constants';
declare var $;

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  private userSelecting = false;
  private users: User[];
  private selectedUsers: User[];
  private template = new Template();
  private templates: Template[];
  private templateNamesMessages = templateNamesMessages;

  constructor(private userService: UserService,
              private emailService: EmailService) {
  }

  ngOnInit() {
    $('body').foundation();
    this.getUsersFromServer();
    this.getTemplatesFromServer();
    this.initEmptyTemplate();
  }

  private getUsersFromServer() {
    this.userService.list().subscribe(res => {
      this.users = res.users;
    });
  }

  private initEmptyTemplate(): void {
    this.template.backgroundColor = '#FFFFFF';
  }

  private toggleUserSelection() {
    this.userSelecting = !this.userSelecting;
  }

  private addUsers(select): void {
    this.selectedUsers = Array.apply(null, select.options).filter((option: any) => {
      return option.selected;
    }).map((item: any) => {
      return this.users.find(user => {
        return item.value == user.id;
      });
    });
  }

  private removeFromSelected(user: User): void {
    this.selectedUsers.splice(
      this.selectedUsers.findIndex(u => {
          return u.id === user.id;
        }
      ), 1
    );
  }

  private getTemplatesFromServer(): void {
    this.emailService.getTemplates().subscribe(result => {
      this.templates = [...result, new Template()];
      this.setDefaultBackground('#FFFFFF');
    });
  }

  private setDefaultBackground(color: string): void {
    this.templates.forEach(template => {
      template.backgroundColor = color;
    });
  }

  private sendEmail(): void {
    this.addSelectedUsersToTemplate();
    this.emailService.sendEmail(this.template).subscribe();
  }

  private addSelectedUsersToTemplate(): void {
    this.template.receiverIds = this.selectedUsers.map(user => {
      return user.id;
    });
  }

  private changeTemplateType(body: any): void {
    this.template = this.templates.find(item => {
      return item.type === this.template.type;
    });
  }
}
