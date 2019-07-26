import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../model/Entities';
import { NgForm } from '@angular/forms';

declare var $ : any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: []
})
export class EmployeeComponent implements OnInit {


  employees : [];

  constructor(private empService : EmployeeService) { }

  ngOnInit() {
    this.empService.formData = {
      id:null,
      name: '',
      contactnumber: '',
      address: '',
      birthdate: '',
      username: '',
      password: '',
    };

    this.loadEmployees();
  }

  loadEmployees() {

    this.empService.loadEmployees().subscribe((data : any ) => {
        var result = JSON.parse(data);
        this.employees = result;
    })

  }

  editEmployee(emp: Employee) {
    
    this.empService.formData = Object.assign({}, emp);
    $("#modalEmp").modal("toggle");

  }

  submitEmployee(form : NgForm) {
    
    if (form.value.id == null) {
      this.insertEmployee(form);
    }else {
      this.updateEmployee(form);
    }

  }

  insertEmployee(form : NgForm) { 
    
    this.empService.postEmployee(form.value).subscribe(res => {
        this.loadEmployees();
    })
    
  }

 
  updateEmployee(form : NgForm) {
    
    this.empService.putEmployee(form.value).subscribe(res => {
      this.loadEmployees();   
      $("#modalEmp").modal("toggle");
    })

  }

  addEmployee() {
    
    this.empService.formData = {
      id:null,
      name: '',
      contactnumber: '',
      address: '',
      birthdate: '',
      username: '',
      password: '',
    };
    
    $("#modalEmp").modal("toggle");
  }


}
