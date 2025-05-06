import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TableRowComponent } from '../table-row/table-row.component';

@Component({
  selector: 'app-group',
  imports: [MatIconModule, FormsModule, TableRowComponent],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent {
  @Input() groupIndex!: number;
  @Input() group: any;
  @Input() trigger: boolean = false;
  @Input() inValid: boolean = false;
  @Output() deleteGroupEvent = new EventEmitter<number>();
  @Output() addGroupEvent = new EventEmitter<number>();
  ngAfterViewInit(){
    //console.log(this.groupIndex+":"+this.group)
  }
  deleteGroupElement(){
    this.deleteGroupEvent.emit(this.groupIndex);
  }
  deleteGroup($event: number) {
    console.log('delete Group index: '+$event)
    this.group.docs.splice($event, 1);
  }    
  addRow(){
    this.group.records.push({name:'', email:'', phone:'', subject:''})
  }
  addGroupElement(){
    this.addGroupEvent.emit(this.groupIndex)
  }
  addGroup($event: number){
    this.group.docs.push({
      "records":[{name:'',email:'', phone:'', subject: ''}],
      "docs":[]
    });
  }
  addChildGroup() {
    this.group.docs.push({
      records: [{name:'',email:'', phone:'', subject: ''}],
      docs: []
    })
  }
}
