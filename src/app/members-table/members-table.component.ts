import { Component, inject, Input } from '@angular/core';
import { DataService } from '../data.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-members-table',
  imports: [MatIconModule, FormsModule, NgClass, MatSelect, MatOption],
  templateUrl: './members-table.component.html',
  styleUrl: './members-table.component.scss'
})
export class MembersTableComponent {
  @Input() members: any =[];
  trigger = false;
  subjects= ['C','C++','C#','JAVA','PYTHON','ANGULAR'];
  _snackbar = inject(MatSnackBar);
  constructor(private dataservice: DataService) {}
  ngOnInit(): void {
  }
  deleteRow(member: any){
    this.members.splice(member, 1);
  }
  saveMember(member:any){
    this._snackbar.open(JSON.stringify(member,null,3),'OK',{duration: 5000})
  }
  toggleSelectAll(index: number){
    this._snackbar.open(this.members[index].subjects.length,'',{duration: 5000})
    const selected = this.members[index].subjects || [];
    const allSelected = this.subjects.every(subject => selected.includes(subject));
    if (allSelected) {
      this.members[index].subjects = [];
    }else{
      this.members[index].subjects = [...this.subjects];
    }
  }
}
