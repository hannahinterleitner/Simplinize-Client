import { Component, OnInit } from '@angular/core';
import {DataService} from '../_services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(public dataService: DataService) {}

  ngOnInit() {
  }


}
