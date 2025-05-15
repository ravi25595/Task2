import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormsModule } from '@angular/forms'; // ✅ 
import { NgClass } from '@angular/common';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-table-row',
  imports: [MatIconModule,FormsModule, NgClass,MatSelect, MatOption],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss'
})
export class TableRowComponent {
  @Input() group: any;
  @Input() trigger: boolean = false;
  // @Input() inValid: boolean = false;
  groupForm = new FormGroup({
  });
  selectedSubject = ''
  subjects= ['C','C++','C#','JAVA','PYTHON','ANGULAR'];
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //console.log(this.rowData)
  }
  saveRow(index: number) {
    console.log(this.group.records[index]);
  }
  deleteRow(index: number) {
    this.group.records.splice(index, 1)
  }
  errorMessage(arg0: string) {
    if (arg0) return;
    return "* This Field is Required.";
  }
  get hasErrors(): boolean {
    return this.group.records.some((record: { name: any; email: any; phone: any; subject: any; })  => {
      return !record.name || !record.email || !this.isValidEmail(record.email) || !record.phone || !record.subject;
    })
  }
  isValidEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
  get inValid(): boolean{
    return this.hasErrors;
  }
}