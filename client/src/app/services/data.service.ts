import { Injectable } from '@angular/core';
import { Dashboard, DashboardData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private DashboardData: Dashboard = DashboardData;

  constructor() { }

  setDashboardData(dashboardData: Dashboard) {
    this.DashboardData = dashboardData;
  }

  getDashboardData() {
    return JSON.parse(JSON.stringify(this.DashboardData));
  }

}
