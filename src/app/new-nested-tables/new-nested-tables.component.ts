import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { GroupComponent } from "../group/group.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-new-nested-tables',
  imports: [GroupComponent, GroupComponent, MatIconModule],
  templateUrl: './new-nested-tables.component.html',
  styleUrl: './new-nested-tables.component.scss'
})
export class NewNestedTablesComponent {
[x: string]: any;
  data: any =[];
  trigger: boolean = false;
  inValid: boolean = false;
  APIData: any = "Data Before API Call";
  constructor(public dataService: DataService) {
  }
  initialize() {
    if(confirm("!Are you Sure. You want to delete all data"))
      this.data = [{records:[{name:'',email:'', phone:'', subject: ''}],docs:[]}]
  }
  validateData(){
    this.trigger = !this.trigger
    if(!this.inValid)localStorage.setItem('data', JSON.stringify(this.data));
    alert(this.inValid? "Error: * There are invalid fields in the form." : "Data saved Successfully!");
  }
  ngOnInit(){
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.data = JSON.parse(localStorage.getItem('data')||'{}');
    console.log(JSON.stringify(this.data))
    if (!this.data)
      this.loadJson();
  }
  loadJson(){
    this.dataService.getJsonData().subscribe((res) => {
      this.data = res
      console.log(res)
    })
  }
  deleteGroup($event: number) {
      console.log('delete Group index: '+$event)
      this.data.splice($event,1)
  }
  addGroup($event: number){
    this.data.push({
      "records":[{name:'',email:'', phone:'', subject: ''}],
      "docs":[]
    });
  }
  stringAPIData(){
    this.APIData = [];
    let i=0;
    this.dataService.getJsonData().subscribe(res => {
      JSON.parse(JSON.stringify(res)).forEach((group: { id: number; parentId: number[]; groupName:string}) => {
        this.APIData.push({records:[{}],docs:[]});
        this.dataService.getPersonsByGroupId(group.id).subscribe((res: any) => {
          console.log(res)
        });
      });
    });
  }
  stringifyData(data: any){
    return JSON.stringify(data)
  }
}