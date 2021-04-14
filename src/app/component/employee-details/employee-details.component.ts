import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  filteredCandidateData: any;
  employeeCount = {
    hr: 0,
    operations: 0,
    development: 0,
    finance: 0
  }
  candidateData = [
    { id: 11, name: "Ash", department: "Finance", joining_date: "8/10/2016" },
    { id: 12, name: "John", department: "HR", joining_date: "18/1/2011" },
    { id: 13, name: "Zuri", department: "Operations", joining_date: "28/11/2019" },
    { id: 14, name: "Vish", department: "Development", joining_date: "7/7/2017" },
    { id: 15, name: "Barry", department: "Operations", joining_date: "19/8/2014" },
    { id: 16, name: "Ady", department: "Finance", joining_date: "5/10/2014" },
    { id: 17, name: "Gare", department: "Development", joining_date: "6/4/2014" },
    { id: 18, name: "Hola", department: "Development", joining_date: "8/12/2010" },
    { id: 19, name: "Ola", department: "HR", joining_date: "7/5/2011" },
    { id: 20, name: "Kim", department: "Finance", joining_date: "20/10/2010" }]

  nameToSearch: string;

  departments = this.candidateData.map(x => {
    return x.department
  })



  constructor() {

  }

  ngOnInit(): void {
    this.getExperiencedCandidate();
    this.countEmployeeInDepartment();
    this.getCandidatesWithoutDepartment();

  }


  isAscOrder: boolean = true
  sortData(key) {

    this.isAscOrder = !this.isAscOrder;

    if (this.isAscOrder == true) {
      if (key == "name") {
        this.candidateData = this.candidateData.sort((a, b) => {
          return a.name > b.name ? -1 : 1;
        })
      }

      if (key == "joining_date") {
        this.candidateData = this.candidateData.sort((a: any, b: any) => {
          let date1 = a.joining_date.split(/\//);
          date1 = [date1[1], date1[0], date1[2]].join('/')
          let date2 = b.joining_date.split(/\//);
          date2 = [date2[1], date2[0], date2[2]].join('/')
          //return date1 - date2
          return +new Date(date1) - +new Date(date2)
        })
      }
    } else {
      if (key == "name") {
        this.candidateData = this.candidateData.sort((a, b) => {
          return a.name < b.name ? -1 : 1;
        })
      }

      if (key == "joining_date") {
        this.candidateData = this.candidateData.sort((a: any, b: any) => {
          let date1 = a.joining_date.split(/\//);
          date1 = [date1[1], date1[0], date1[2]].join('/')
          let date2 = b.joining_date.split(/\//);
          date2 = [date2[1], date2[0], date2[2]].join('/')
          //return date1 - date2
          return +new Date(date2) - +new Date(date1)
        })
      }
    }

  }

  search(keyword) {
    this.filteredCandidateData = this.candidateData.filter(x => {
      if (x.name.toLowerCase().includes(keyword.toLowerCase())) {
        return x;
      }
    })
    // console.log("search by keyword", keyword)
  }
  filteredCandidateDataOnYears: any
  getExperiencedCandidate() {
    this.filteredCandidateDataOnYears = this.candidateData.filter(x => {
      let date1 = new Date()
      let date2 = new Date(x.joining_date.split(/\//).reverse().join('/'));
      var diff = date1.getTime() - date2.getTime();

      // To calculate the no. of years between two dates
      diff /= (365 * 24 * 60 * 60 * 1000);
      if (diff >= 2) {
        return x
      }
    })
    console.log("candidate with experience more than 2 years", this.filteredCandidateDataOnYears)
  }


  count_duplicate(a) {
    let counts = {}

    for (let i = 0; i < a.length; i++) {
      if (counts[a[i]]) {
        counts[a[i]] += 1
      } else {
        counts[a[i]] = 1
      }
    }
    for (let prop in counts) {
      if (counts[prop] >= 2) {
        console.log(prop + " counted: " + counts[prop] + " times.")
      }
    }
    return counts;
  }

  departmentCount: any
  countEmployeeInDepartment() {
    this.departmentCount = this.count_duplicate(this.departments);
    console.log("employee in dept", this.departmentCount)
  }

  candidateFilterOnDepartment: any
  getCandidatesWithoutDepartment() {
    this.candidateFilterOnDepartment = this.candidateData.filter(x => {
      if (x.department != "Development") {
        return x;
      }
    })
    console.log("candidate with other departments than Development", this.candidateFilterOnDepartment);

  }

}
