import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styles: []
})
export class AttendanceComponent implements OnInit {

  timeIn : [];
  frDate : any;
  toDate : any;

  constructor(private empService : EmployeeService,
              public datepipe : DatePipe) { }

  ngOnInit() {

    this.frDate = this.transformDate(new Date());
    this.toDate = this.transformDate(new Date());

    this.loadTimeIn();
  }

  loadTimeIn() {

    this.empService.loadTimeIn().subscribe((data : any) => {
      var result = JSON.parse(data);
      this.timeIn = result;
    });

  }

  searchDateTimeIn(frDate,toDate) {
    console.log(frDate + " To: " + toDate)
    
    this.empService.searchDateTimeIn(this.frDate,this.toDate).subscribe((data : any) => {
      var result = JSON.parse(data);
      this.timeIn = result;
    })


  }

  downloadExcel(frDate,toDate) {

    window.open("http://localhost:3874/api/employee/downloadAttendance?from="+frDate+"&to="+toDate);

  }

  transformDate(date) {
    return this.datepipe.transform(date, 'y-MM-dd');
  }



}
