import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from '../employee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  serverUrl = 'https://employeeportal-server-il4o.onrender.com'

  constructor(private http: HttpClient) { }


  loginApi() { /* it returns observable */
    return this.http.get(`${this.serverUrl}/Employees/1`)
  }

  //api to add an employee
  addEmployeeApi(employee: EmployeeModel) {
    return this.http.post(`${this.serverUrl}/Employees`, employee)

  }

  //api to get all employees (to display them)
  getAllEmployeeApi() {
    return this.http.get(`${this.serverUrl}/Employees`)

  }

  //api to delete an employee
  deleteEmployeeApi(id: any) {
    return this.http.delete(`${this.serverUrl}/Employees/${id}`)

  }

  //api to get details of a particular employee 
  getAEmployeeApi(id: any) {
    return this.http.get(`${this.serverUrl}/Employees/${id}`)
  }

  //API TO UPDATE A PARTICULAR EMPLOYEE

  updateEmployee(id: any, body: any) {
    return this.http.put(`${this.serverUrl}/Employees/${id}`, body)
  }

  //update admin details

  updateAdminApi(body: any) {
    return this.http.put(`${this.serverUrl}/Employees/1`, body)
  }
}

