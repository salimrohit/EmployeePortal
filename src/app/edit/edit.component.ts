import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { EmployeeModel } from '../employee.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  Employee:EmployeeModel={}

  // ActivatedRoute class is used to access id from the url
  constructor(private route:ActivatedRoute,private api:ApiServiceService, private router:Router){}
  
                
  ngOnInit(): void {
    this.route.params.subscribe((res)=>{
      console.log(res);
      const {id} = res
      console.log(id);
      this.getExisitingUser(id)
    })      
  }

  getExisitingUser(id:any){
    this.api.getAEmployeeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.Employee = res
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  updateEmployee(id:any){
    this.api.updateEmployee(id, this.Employee).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert('Employee details updated successfully')
        this.router.navigateByUrl('employee')        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })

  }

  cancelEdit(id:any){
    this.getExisitingUser(id)   
  }


}
