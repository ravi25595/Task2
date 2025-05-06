import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { DataService } from '../data.service';
@Component({
  selector: 'app-nested-tables',
  imports: [MatIconModule],
  templateUrl: './nested-tables.component.html',
  styleUrl: './nested-tables.component.scss'
})
export class NestedTablesComponent {

  row = document.getElementById("tableRecord");
  group = document.getElementById("group");
  data: any =[];
  constructor(private dataService: DataService){
    /*
    this.dataService.getJsonData().subscribe((res: any) =>{
      //alert(JSON.stringify(res));
    })
    */
  }
  newLoadJson(){
    this.dataService.getJsonData().subscribe((res: any) =>{
      this.data = res;
      document.getElementById("group")?.remove()
      const container = document.getElementById("container")
      res.forEach((doc: any, index: number) => {
        if (container)
          this.createGroup(container, doc);
      });
    });
  }
  createGroup(container: HTMLElement, doc: any){
    
    const newContainer = this.group?.cloneNode(true) as HTMLElement
    newContainer.querySelector('mat-icon#add')?.addEventListener('click',(event) => {this.addRecord(event)});
    newContainer.querySelector('mat-icon#plusG')?.addEventListener('click', (e) => this.addGroup(e))
    newContainer.querySelector('mat-icon#plusN')?.addEventListener('click', (e) => this.addChildGroup(e))
    newContainer.querySelector('mat-icon#delete')?.addEventListener('click', (e) => this.deleteGroup(e))
    newContainer.querySelector('mat-icon.delete')?.addEventListener('click', (e) => this.deleteRow(e))
    newContainer.querySelector('mat-icon.save')?.addEventListener('click', (e) => this.saveRow(e))
    if (doc.records){
      newContainer.querySelector('tr#tableRecord')?.remove()
      doc.records.forEach((record: any) => {
        console.log(record);
        this.createRecord(newContainer,record)
      });
    }
    if (doc.docs){
      const parent = newContainer.querySelector('div#docContainer') as HTMLElement;
      doc.docs.forEach((doc: any) => {
        if (parent)
        this.createGroup(parent, doc);
      });
    }
    if (container?.parentElement)
      container?.parentElement.append(newContainer)
  }
  createRecord(newContainer: HTMLElement, record: any) {
    if (!this.row) return;
    const newRow = this.row.cloneNode(true) as HTMLElement
    const nameInput = newRow.querySelector('input[name="name"]') as HTMLInputElement
    nameInput.value = record.name

    const emailInput = newRow.querySelector('input[name="email"]') as HTMLInputElement
    emailInput.value = record.email

    const phoneInput = newRow.querySelector('input[name="phone"]') as HTMLInputElement
    phoneInput.value = record.phone

    
    newRow.querySelector('mat-icon.delete')?.addEventListener('click', (event) => {this.deleteRow(event)})
    newRow.querySelector('mat-icon.save')?.addEventListener('click', (event) => {this.saveRow(event)})
    const table = newContainer.querySelector('table#table')
    table?.appendChild(newRow)
  }
  /*
  loadJson(){
    this.dataService.getJsonData().subscribe((res: any) =>{
      document.getElementById("tableRecord")?.remove()

      const table = document.getElementById("table") as HTMLTableElement;
      for (let i=0; i<res["records"].length; i++){
        const cloneRow = this.row?.cloneNode(true) as HTMLElement
        const nameInput = cloneRow.querySelector('input[name="name"]') as HTMLInputElement
        nameInput.value = res["records"][i].name

        const emailInput = cloneRow.querySelector('input[name="email"]') as HTMLInputElement
        emailInput.value = res["records"][i].email

        const phoneInput = cloneRow.querySelector('input[name="phone"]') as HTMLInputElement
        phoneInput.value = res["records"][i].phone

        
        cloneRow.querySelector('mat-icon.delete')?.addEventListener('click', (event) => {this.deleteRow(event)})
        cloneRow.querySelector('mat-icon.save')?.addEventListener('click', (event) => {this.saveRow(event)})
        table.append(cloneRow);
      }
      for (let i=0; i<res["docs"].length; i++){
        console.log(res["docs"][i]+i)
        const cloneGroup = this.group?.cloneNode(true) as HTMLElement;
        document.getElementById("container")?.append(cloneGroup)
      }
    })
  }*/
  ngAfterViewInit(){
    this.row = document.getElementById("tableRecord")?.cloneNode(true) as HTMLElement;  
    this.group = document.getElementById("group")?.cloneNode(true) as HTMLElement;
    console.log(this.row)
    this.newLoadJson()
  }
  addRecord(event: Event){
    const button = event.target as HTMLElement;
    const table = button.nextElementSibling?.nextElementSibling?.nextElementSibling?.firstElementChild;
    
    if(table && this.row) {
      const newRow = this.row.cloneNode(true) as HTMLElement
      newRow.querySelector('mat-icon.delete')?.addEventListener('click', (event) => {this.deleteRow(event)})
      newRow.querySelector('mat-icon.save')?.addEventListener('click', (event) => {this.saveRow(event)})
      table.appendChild(newRow)
    }
    /*
    if (table){
      const newRow = document.createElement("app-table-row").cloneNode(true)
      table.appendChild(newRow)
      console.log(newRow)
    }*/

    //alert(table);
  }
  deleteRow(event: Event){
    const button = event.target as HTMLElement;
    const row = button.parentElement?.parentElement;
    row?.remove();
  }
  saveRow(event: Event){
    const button = event.target as HTMLElement;
    const row = button.parentElement?.parentElement;
    //Name validation
    const nameInput = row?.querySelector('input[name="name"]') as HTMLInputElement;
    const name = nameInput.value;
    const small = nameInput.parentElement?.querySelector('small')
    if (name){
      nameInput.classList.remove("inputError")
      if (small)
      small.textContent = ''
    }else{
      nameInput.classList.add("inputError")
      if (small)
      small.textContent = '*Name is required'
    }
    //Email Validation
    const emailInput = row?.querySelector('input[name="email"]') as HTMLInputElement;
    const email = emailInput.value;
    const esmall = emailInput.parentElement?.querySelector('small')
    if (email){
      emailInput.classList.remove("inputError")
      if (esmall)
      esmall.textContent = ''
    }else{
      emailInput.classList.add("inputError")
      if (esmall)
      esmall.textContent = '*Email is required'
    }
    //Phone Number validation
    const phoneInput = row?.querySelector('input[name="phone"]') as HTMLInputElement;
    const phone = phoneInput.value;
    const psmall = phoneInput.parentElement?.querySelector('small')
    if (phone.trim()){
      phoneInput.classList.remove("inputError")
      if (psmall)
      psmall.textContent = ''
    }else{
      phoneInput.classList.add("inputError")
      if (psmall)
      psmall.textContent = '*Phone number is required'
    }
    this.data[0].records[0].name = name
    this.data[0].records[0].email = email
    this.data[0].records[0].phone = phone
    console.log(this.data);
    this.dataService.putJsonData(this.data);
    //alert([name,email,phone])
  }
  addGroup(event: Event){
    const button = event.target as HTMLElement;
    const container = button.parentElement
    const newContainer = this.group?.cloneNode(true) as HTMLElement
    newContainer.querySelector('mat-icon#add')?.addEventListener('click',(event) => {this.addRecord(event)});
    newContainer.querySelector('mat-icon#plusG')?.addEventListener('click', (e) => this.addGroup(e))
    newContainer.querySelector('mat-icon#plusN')?.addEventListener('click', (e) => this.addChildGroup(e))
    newContainer.querySelector('mat-icon#delete')?.addEventListener('click', (e) => this.deleteGroup(e))
    newContainer.querySelector('mat-icon.delete')?.addEventListener('click', (e) => this.deleteRow(e))
    newContainer.querySelector('mat-icon.save')?.addEventListener('click', (e) => this.saveRow(e))
    if (container?.parentElement)
    container?.parentElement.append(newContainer)
  }
  addChildGroup(event: Event){
    const button = event.target as HTMLElement;
    const div = button.nextElementSibling?.lastElementChild;
    const newContainer = this.group?.cloneNode(true) as HTMLElement
    newContainer.querySelector('mat-icon#add')?.addEventListener('click',(event) => {this.addRecord(event)});
    newContainer.querySelector('mat-icon#plusG')?.addEventListener('click', (e) => this.addGroup(e))
    newContainer.querySelector('mat-icon#plusN')?.addEventListener('click', (e) => this.addChildGroup(e))
    newContainer.querySelector('mat-icon#delete')?.addEventListener('click', (e) => this.deleteGroup(e))
    newContainer.querySelector('mat-icon.delete')?.addEventListener('click', (e) => this.deleteRow(e))
    newContainer.querySelector('mat-icon.save')?.addEventListener('click', (e) => this.saveRow(e))
    if(this.group){
      //alert(div?.innerHTML)
      div?.appendChild(newContainer);
    }
  }
  deleteGroup(event: Event){
    (event.target as HTMLElement).parentElement?.remove();
  }
}