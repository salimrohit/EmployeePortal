import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { ApiServiceService } from '../services/api-service.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  adminStatus: boolean = false
  adminDetails: any = {}
  profileImage:string='../assets/2120b058cb9946e36306778243eadae5-removebg-preview.png'
  showSideBar:boolean=true
  employeeCount:number=0

  selected: Date | null = new Date();
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {

  }
  constructor(private api: ApiServiceService) {
    this.chartOptions = {
      /* type of chart */
      chart: {
        type: 'pie'
      },
      /* title */
      title: {
        text: 'Project Completion Report'
      },
      tooltip: {
        valueSuffix: '%'
      },
      /* to remove the watermark at the right bottom of the pie chart */
      credits: {
        enabled: false
      },
      /* styling */
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
            enabled: true,
            distance: 20
          }, {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10
            }
          }]
        }
      },
      /* data */
      series: [
        {
          name: 'Percentage',
          colorByPoint: true,
          data: [
            {
              name: 'Chrome',
              y: 55.02
            },
            {
              name: 'FireFox',
              y: 26.71
            },
            {
              name: 'Safari',
              y: 1.09
            },
            {
              name: 'Edge',
              y: 15.5
            },
            {
              name: 'Brave',
              y: 1.68
            }
          ]
        }
      ]
    }
    HC_exporting(Highcharts);

    //function to get admin details
    this.getAdminDetails()
    
  }

  ngOnInit(): void {
    this.getAllEmployee()
  }


  getAdminDetails(){
    //function to get admin details
    this.api.loginApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.adminDetails = res
        if(res.picture){
          this.profileImage = res.picture
        }


      },
      error: (err: any) => {
        console.log(err);

      }
    })

  }

  editStatus() {
    this.adminStatus = true
  }

  cancelStatus() {
    this.adminStatus = false
    this.getAdminDetails()
  }

  updateAdmin(){
    this.api.updateAdminApi(this.adminDetails).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: "Wow",
          text: "Admin Details updated successfully",
          icon: "success"
        })
        console.log(res);
        this.adminDetails = res
        this.adminStatus = false
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  getFile(event:any){
    let file = event.target.files[0]
    console.log(file);
    //to convert to url - fileReader()
  //1) create an object for the class
  let fr = new FileReader()
  //2)convert the file into url
  fr.readAsDataURL(file)
  //3)access the url using onload function
  fr.onload=(event:any)=>{
    console.log(event.target.result);
    this.profileImage = event.target.result
    this.adminDetails.picture = event.target.result    
  }

  }

  //function to handle sidebar
  handleSideBar(){
    this.showSideBar=!this.showSideBar

  }

  getAllEmployee(){
    this.api.getAllEmployeeApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.employeeCount = res.length
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }

    })
  }
  
  

  

}


