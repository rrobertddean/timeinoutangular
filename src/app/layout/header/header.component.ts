import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Router } from '@angular/router';

declare var $ : any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})

export class HeaderComponent implements OnInit {

  employee : [];
  adminId : string;

  constructor(private empservice : EmployeeService, 
              private router: Router) { }

  ngOnInit() {
    this.adminId = this.readlocalStorageValue("adminid");
    this.resetForm();
  }

  resetForm(form?: NgForm) {

    if (form != null) {
      form.resetForm(); 
    }

  }


  submitTimeIn(username,password) {
    
      this.empservice.empSubmitTimeIn(username,password).subscribe((data : any) => {
         
          if (data == "0") {
            alert("Succesfull time in");
          }else if (data == "-1") {
            alert("You have already timed in");
          }else if (data == "-2") {
            alert("Invalid Username/Password"); 
          }

      });
  }

  submitLoginAdmin(username,password) {

      this.empservice.empSubmitLoginAdmin(username,password).subscribe((data : any) => {
          var result = JSON.parse(data);

          if (result.length > 0) {
            // console.log(result.length);
            // for(var x =0; x < result.length; x++) {
            //   console.log(result[x].name);
            // }

            this.empservice.adminInfo = data;
            localStorage.setItem("adminid",result[0].id);

            $("#modalAdminLogin").modal("toggle");
            this.router.navigate(['/admin']);
            

          }else { 
            alert("Invalid Username/Password");
          }
      })
  }

  logOut() {
    localStorage.removeItem("adminid")
    this.router.navigate(['/home']);
    
  }

  readlocalStorageValue(key) {
    return localStorage.getItem(key);
  }



}
