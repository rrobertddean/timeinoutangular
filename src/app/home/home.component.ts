import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})

export class HomeComponent implements OnInit {

  timeInToday : [];
  today : number = Date.now();

  constructor(private empService : EmployeeService) { }

  ngOnInit() {
    this.loadTimeIn();
    
    
  }

  loadTimeIn() {

      this.empService.loadTimeInToday().subscribe((data : any) => {
        var result = JSON.parse(data);

        this.timeInToday = result;
      })

  }

}
