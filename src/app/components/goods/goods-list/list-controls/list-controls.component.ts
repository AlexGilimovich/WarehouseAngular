import {Component, OnInit, EventEmitter, Input,Output} from '@angular/core';

@Component({
  selector: 'app-list-controls',
  templateUrl: './list-controls.component.html',
  styleUrls: ['./list-controls.component.scss']
})
export class ListControlsComponent implements OnInit {

  @Output() private onSaveChanges = new EventEmitter();
  @Output() private onCancelChanges = new EventEmitter();
  @Output() private onOpenStatusModal = new EventEmitter();
  @Input() private hasChanged:boolean = false;
  @Input() private hasSelected:boolean = false;

  constructor() {
  }

  ngOnInit() {
  }


  private saveChanges() {
    this.onSaveChanges.emit();
  }

  private cancelChanges() {
    this.onCancelChanges.emit();
  }

  private batchStatusUpdate() {
    this.onOpenStatusModal.emit();
  }
}
