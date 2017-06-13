import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user-service.service';
import { EmailService } from './email.service';
import { Template } from './template';
import { templateNamesMessages } from './constants';

import { UploadItem }    from 'angular2-http-file-upload';

declare var $;

const COLOR_WHITE = '#FFFFFF';

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
    this.template.backgroundColor = COLOR_WHITE;
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
      this.setDefaultBackground(COLOR_WHITE);
    });
  }

  private setDefaultBackground(color: string): void {
    this.templates.forEach(template => {
      template.backgroundColor = color;
    });
  }

  private sendEmail(fileInput): void {
    this.addSelectedUsersToTemplate();

    const template: Template = new Template();
    template.backgroundColor = '#FFFFFF';
    template.receiverIds = [1];
    // template.type = 'BIRTHDAY';
    this.emailService.sendEmail(template, fileInput.files[0]).subscribe();
    // this.emailService.sendEmail(this.template, fileInput.files[0]).subscribe();
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
