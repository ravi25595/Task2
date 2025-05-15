import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../data.service';
import { MembersTableComponent } from "../members-table/members-table.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-group',
  imports: [MatIconModule, MembersTableComponent],
  templateUrl: './new-group.component.html',
  styleUrl: './new-group.component.scss'
})
export class NewGroupComponent {
  @Input() group: any;
  @Input() data: any;
  @Input() parentGroups: any;
  @Input() index: string = '';
  @Input() getGroupsByParentId!: (id: number) => void;
  _snackbar = inject(MatSnackBar)
  createchild(id: number) {
    console.log(id)
  }
  docs: any = [];
  members: any=null;
  public constructor (private dataservice: DataService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //this.dataservice.getGroupsByParentId(this.group.id).subscribe(res => this.docs=res)
    this.docs = this.getGroupsByParentId(this.group.id)
    this.dataservice.getPersonsByGroupId(this.group.id).subscribe(res => {
      if (res && res.length > 0){
        this.members = res;
        //console.log("members = "+JSON.stringify(res));
      }
      else
        this.members = [{id: 0, name:'',email:'',phone:'',subject:[]}]
      
    })
  }
  ngAfterViewInit(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    console.log("data: "+this.data)
    this.group.groupName = this.index;
    this.data.array.forEach((g:any) => {
      if (g.id === this.group.id)
        g.groupName = this.index;
    });
  }
  addRow(GroupId: number) {
    this.members.push({id:GroupId, name:'',email:'',phone:'',subject:[]})
  }
  deleteGroup(id: any) {
    this._snackbar.open(''+id,'',{duration: 2000})
    this.parentGroups.splice(this.group, 1)
    this.dataservice.deleteGroupById(id).subscribe((res:any) => {
      this._snackbar.open(JSON.stringify(res),'',{duration: 2000})
    })
  }
  addGroup(parentId: any) {
    this.dataservice.createGroupByParentId(parentId).subscribe((res: any) => {
      this.parentGroups.push(res);
      this._snackbar.open(parentId+':'+res.id,'OK',{duration:5000})
    });
  }
  addChildGroup(parentId: any){
    this._snackbar.open(parentId,'OK',{duration:1500})
    this.dataservice.createGroupByParentId(parentId).subscribe((res: any) => {
      this.docs.push(res);
    });
  }
}
