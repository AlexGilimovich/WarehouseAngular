import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user-service.service';
import { EmailService } from './email.service';
import { Template } from './template';
import { templateNamesMessages } from './constants';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

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
  private selectedUsers: User[] = [];
  private templates: Template[];
  private templateNamesMessages = templateNamesMessages;
  private selectedTemplate: Template = new Template('');
  private form: FormGroup;

  constructor(private userService: UserService,
              private emailService: EmailService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getUsersFromServer();
    this.getTemplatesFromServer();
    this.buildForm();
    this.initForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      'template': [{value: ''}],
      'subject': [{value: ''}],
      'backgroundColor': [{value: ''}],
      'body': [{value: ''}],
      'users': new FormArray([], Validators.compose([this.userValidator]))
    });
  }

  private initForm(): void {
    this.form.controls['template'].setValue('');
    this.form.controls['subject'].setValue('');
    this.form.controls['backgroundColor'].setValue(COLOR_WHITE);
    this.form.controls['body'].setValue('');
  }

  private getUsersFromServer() {
    this.userService.list().subscribe(res => {
      this.users = res.users;
    });
  }

  private toggleUserSelection() {
    this.userSelecting = !this.userSelecting;
  }

  private addUsers(select): void {
    Array.apply(null, select.options).filter((option: any) => {
      return option.selected;
    }).forEach((item: any) => {
      (<FormArray>this.form.controls['users']).push(new FormControl(item.value));
      this.selectedUsers.push(this.users.find(user => {
        return item.value === user.id.toString();
      }));
    });
  }

  private removeFromSelected(user: User): void {
    const index: number = this.selectedUsers.findIndex(u => {
        return u.id === user.id;
      }
    );
    (<FormArray>this.form.controls['users']).removeAt(index);
    this.selectedUsers.splice(index, 1);
  }

  private getTemplatesFromServer(): void {
    this.emailService.getTemplates().subscribe(result => {
      this.templates = [...result, this.selectedTemplate];
      this.setDefaultBackground(COLOR_WHITE);
    });
  }

  private setDefaultBackground(color: string): void {
    this.templates.forEach(template => {
      template.backgroundColor = color;
    });
  }

  private sendEmail(fileInput): void {
    const template: Template = this.buildTemplate();
    this.emailService.sendEmail(template).subscribe();
  }

  private buildTemplate(): Template {
    const template: Template = new Template();
    template.backgroundColor = this.form.controls['backgroundColor'].value;
    template.subject = this.form.controls['subject'].value;
    template.body = this.form.controls['body'].value;
    template.type = this.form.controls['template'].value;
    template.receiverIds = this.selectedUsers.map((user: User) => {
      return user.id;
    });

    return template;
  }

  private userValidator(array: FormArray) {
    const errors: any = {};
    if (array.length === 0) {
      errors.noSelectedUsers = true;
    }
    return errors;
  }

  private changeTemplate(): void {
    const templateType = this.form.controls['template'].value;
    this.selectedTemplate = this.templates.find((template: Template) => {
      return template.type === templateType;
    });
    this.form.controls['body'].setValue(this.selectedTemplate.body);
    this.changeBackgroundColor();
  }

  private changeBackgroundColor(): void {
    this.selectedTemplate.backgroundColor = this.form.controls['backgroundColor'].value;
  }
}


