import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../model/Entities';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  readonly rootUrl = 'http://localhost:3874/';

  adminInfo = [];
  formData: Employee;

  constructor(private http : HttpClient) { }


  empSubmitTimeIn(username,password) {
    
    const headers = new HttpHeaders().set('content-type', 'application/json');

    var body = {
      username : username,
      password : password
    }

    return this.http.post(this.rootUrl+'api/employee/timeinauthenticate',body,{
      headers,
    });

  }

  empSubmitLoginAdmin(username,password) {

    const headers = new HttpHeaders().set('content-type', 'application/json');

    var body = {
      username : username,
      password : password
    }

    return this.http.post(this.rootUrl+'api/employee/loginadminauthenticate',body,{
      headers,
    });

  }

  searchDateTimeIn (frDate,toDate) {

    const headers = new HttpHeaders().set('content-type', 'application/json');

    var body = {
      frDate : frDate,
      toDate : toDate
    }

    return this.http.post(this.rootUrl + 'api/employee/searchDateTimeIn', body , {
      headers
    });


  }


  loadTimeInToday() {
    return this.http.get(this.rootUrl+'api/employee/loadTimeInToday');
  }

  loadTimeIn() {
    return this.http.get(this.rootUrl+'api/employee/loadTimeIn');
  }

  loadEmployees() {
    return this.http.get(this.rootUrl+'api/employee/loadEmployees');
  }

  putEmployee(formData : Employee) {
    return this.http.put(this.rootUrl+'api/employee/putEmployee/'+formData.id,formData);
  }

  postEmployee(formData : Employee) {
    return this.http.post(this.rootUrl+'api/employee/postEmployee',formData);
  }

  




}
