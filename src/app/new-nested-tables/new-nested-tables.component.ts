import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';
import { GroupComponent } from "../group/group.component";
import { MatIconModule } from '@angular/material/icon';
import { NewGroupComponent } from "../new-group/new-group.component";
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-nested-tables',
  imports: [GroupComponent, MatIconModule, NewGroupComponent],
  templateUrl: './new-nested-tables.component.html',
  styleUrl: './new-nested-tables.component.scss'
})
export class NewNestedTablesComponent {
  data: any[] = [];
  persons: any[] = [];
  trigger: boolean = false;
  inValid: boolean = false;
  APIData: any = "Data Before API Call";
  groups: any;
  private _snackbar = inject(MatSnackBar);
  constructor(public dataService: DataService,public dialog: MatDialog) {
  }
  initialize() {
    if(confirm("!Are you Sure. You want to delete all data"))
      this.data = [{records:[{name:'',email:'', phone:'', subject: ''}],docs:[]}]
  }
  validateData(){
    this.trigger = !this.trigger
    if(!this.inValid)localStorage.setItem('data', JSON.stringify(this.data));
    //alert(this.inValid? "Error: * There are invalid fields in the form." : "Data saved Successfully!");
    this.openDialog();
  }
  openDialog(): void {
    const data = {
      title: "Save confirmation",
      content: "Are you sure you to overwrite everything",
      ok: "Yes",
      cancel: "No"
    }
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle confirmation logic
        this._snackbar.open('Data saved Successfully', 'Ok',{
          duration: 1000,
          panelClass: ['my-snackbar']
        });
      } else {
        // Handle cancellation logic
        this._snackbar.open('!Cancelled','',{duration: 1000,panelClass:['my-snackbar']})
      }
    });
  }
  ngOnInit(){
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //this.data = JSON.parse(localStorage.getItem('data')||'{}');
    console.log(JSON.stringify(this.data))
    if (!this.data)
      this.loadJson();
    //this.getDataFromAPI(0);
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.loadDataFromAPI();
  }
  loadDataFromAPI(){
    console.log("this.getDataFromAPI is called successfully")
    this.dataService.getAllGroups().subscribe(res => {
      this.data = res
      this.groups = this.getGroupsByParentId(0)
    })
    this.dataService.getAllPersons().subscribe(res => {
      this.persons = res
    })
  }
  getDataFromAPI(parentId: number): any{
    this.dataService.getGroupsByParentId(parentId).subscribe(res => {
      this.groups = res
    })
  }
  loadJson(){
    /*
    this.dataService.getJsonData().subscribe((res) => {
      this.data = res
      console.log(res)
    })*/
  }
  deleteGroup($event: number) {
      console.log('delete Group index: '+$event)
      this.data.splice($event,1)
  }
  addGroup($event: number){
    this.groups.push({
      parentId: [$event],
      groupName: "group3"
    });
  }
  stringAPIData(){
    this.APIData = [];
    let i=0;
    this.dataService.getJsonData().subscribe(res => {
      this.APIData = res;
      // JSON.parse(JSON.stringify(res)).forEach((group: { id: number; parentId: number[]; groupName:string}) => {
      //   this.APIData.push({records:[{}],docs:[]});
      //   // this.dataService.getPersonsByGroupId(group.id).subscribe((res: any) => {
      //   //   console.log(res)
      //   // });
      // });
    });
  }
  stringifyData(data: any){
    return JSON.stringify(data)
  }
  getGroupsByParentId(id: number){
    //this.dataService.getGroupsByParentId(id).subscribe(res => this.groups = res)
    const groups:any = [];
    console.log("group: "+ this.data)
    this.data.forEach(group => {
      if( group.parentId == id)
        groups.push(group);
    });
    return groups;
  }
  saveData(){
    const data = {
      title: "Data JSON View",
      content: JSON.stringify(this.groups,null, 5),
      ok: 'OK',
      cancel: 'cancel'
    }
    const dialogRef = this.dialog.open(MyDialogComponent,{
      data: data
    })
  }
  clearData(){
    const data = {
      title: "Clear Data",
      content: JSON.stringify(this.data,null, 5),
      ok: 'OK',
      cancel: 'cancel'
    }
    const dialogRef = this.dialog.open(MyDialogComponent,{
      data: data
    })
  }
}