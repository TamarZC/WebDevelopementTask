import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/Modules/exam.module';
import { ExamsService } from 'src/app/Services/exams.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
})
export class MonitorComponent implements OnInit {
  exams: Exam[] = [];
  allExamOptions: Exam[] = [];
  multiselectDropdownSettings: any = {}; // Customize this based on your multiselect library
  isPassedChecked: boolean = false;
  isFailedChecked: boolean = false;
  displayedColumns: string[] = ['ID', 'Name', 'Average', 'Exams'];
  isPassed: boolean=true;
  filterValues: string[] = [];
  selectedOptions: string[] = [];
  filterString: string = "";



  constructor(private examsService: ExamsService) {
  }

  ngOnInit(): void {
    this.exams = this.examsService.getExams();
    this.allExamOptions = this.examsService.getExams();
  }

getRowClass(row: any): string {

  return  row.Average>65 ? 'green-row' : 'red-row';


}
getStatusPassed(event:any){
  debugger
    this.isPassedChecked = !this.isPassedChecked;
    this.filter();

}
getStatusFailed(event: any){
  this.isFailedChecked = !this.isFailedChecked;
  this.filter();

}

filter(){
  if(this.isFailedChecked == true && this.isPassedChecked == false)
  this.exams = this.exams.filter(exam => exam.Average < 65);
  else if(this.isPassedChecked == true && this.isFailedChecked == false)
  this.exams = this.exams.filter(exam => exam.Average > 65);
  else
  {
    this.exams = this.examsService.getExams();
  }
}


applyNameFilter(): void {
  this.filterValues = this.filterString.split(',').map(name => name.trim());
  this.exams = this.exams.filter(item => this.filterValues.some(name => item.Name.includes(name)));
}

applyIdFilter() {
  this.exams = this.exams.filter(exam=> this.selectedOptions.some(id => exam.ID.toString() == (id)));
}

}
