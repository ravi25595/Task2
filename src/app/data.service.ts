import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  persons: any;
  getPersonsByGroupId(id: number): any {
    return this.http.get('https://localhost:7131/GetPersonsByGroupId?GroupId='+id)
  }
  constructor(private http: HttpClient) {}

  getJsonData() {
    //return this.http.get('assets/data.json'); // 👈 this works!
    return this.http.get('https://localhost:7131/api/Group');
  }
  putJsonData(data: any) {
    return this.http.put('http://localhost:3000/docs', data); // 👈 this doesn't works!
  }
  saveJsonToFile(data: any, filename: string = 'data.json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    window.URL.revokeObjectURL(url);
  }
}

