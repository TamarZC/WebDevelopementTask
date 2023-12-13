import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { Trainee } from 'src/app/Modules/trainee.model';
import { TraineeService } from 'src/app/Services/trainee.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent {
  traineesForm!: FormGroup;
  displayedColumns: string[] = ['ID', 'Name', 'Date', 'Grade', 'Subject'];
  filterValue: any = '';
columnFilter: any='';
  rowClicked: boolean = false;

  dataSource: Trainee[] = [];
  filteredTrainees: Trainee[] = [];

  constructor(private fb: FormBuilder, private traineeService: TraineeService) {
    // Initialize the form and add form controls to the FormGroup
    this.traineesForm = this.fb.group({
      ID: ['', Validators.required],
      Name: ['', Validators.required],
      Grade: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Date: ['', Validators.required],
      Address: ['', Validators.required],
      City: ['', Validators.required],
      Country: ['', Validators.required],
      ZIP: ['', Validators.required],
      Subject: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.dataSource = this.traineeService.getTrainees();
  }

  onSubmit() {
    if (this.traineesForm.valid) {
      console.log(this.traineesForm.value);
    }
  }

  addTrainee() {
    debugger
    this.rowClicked = true;
    this.traineesForm.reset();
    if (this.traineesForm.valid) {
      const newTrainee: Trainee = this.traineesForm.value;
      this.traineeService.addTrainee(newTrainee);
      // Reset the form after adding a trainee
      this.traineesForm.reset();
      console.log(this.dataSource);
    }
  }
  viewTrainee(trainee: Trainee){
    this.rowClicked = true;
    this.traineesForm.patchValue(trainee);
  }

  removeTrainee() {
    const formValues = this.traineesForm.value;
    this.traineeService.deleteTrainee(formValues);
    // Clear the form after removal
    this.traineesForm.reset();
    console.log(this.dataSource);
  }

  saveTrainee() {
    const formValues = this.traineesForm.value;
    this.traineeService.editTrainee(formValues);
    // Clear the form after removal
    this.traineesForm.reset();
    console.log(this.dataSource);
  }

  pageSize = 10;
  currentPage = 0;

  // Get the current page data
  get currentPageData(): Trainee[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dataSource.slice(startIndex, endIndex);
  }



  // Pagination event handler
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
  }

  filterByColumn(filterString: string): void {

    // Split the string using ":" as the delimiter
    const parts = filterString.split(':');

    // Trim leading and trailing whitespaces from both parts
    const keyword = parts[0].trim();
    const value = parts[1].trim();

    switch (keyword) {
      case 'ID':
        this.dataSource = this.dataSource.filter(item => {
          return (
            item.ID.toString().toLowerCase().includes(value)
          );
        });;
        break;
      case 'Name':
        this.dataSource = this.dataSource.filter(item => {
          return (
            item.Name.toString().includes(value)
          );
        });
        break;
        case 'Date':
          this.dataSource = this.dataSource.filter(item => {
            return (
              item.Date.toString().includes(value)
            );
          });
        break;

        case 'Grade':
          {
            const operator = value.charAt(0);
            const gradeValue = +value.slice(1);
            switch (operator) {
                case '>':
                  this.dataSource = this.dataSource.filter(trainee => trainee.Grade > gradeValue);
                  break;
                case '<':
                  this.dataSource = this.dataSource.filter(trainee => trainee.Grade < gradeValue);
                  break;
                case '=':
                this.dataSource = this.dataSource.filter(trainee => trainee.Grade == gradeValue);
                break;
                default:
                  // Handle invalid operator
                  console.error('Invalid operator');
                  break;
          }
        }
        break;
        case 'Subject':
          this.dataSource = this.dataSource.filter(item => {
            return (
              item.Subject.toString().includes(value)
            );
          });

        break;
      default:
        // Handle invalid operator
        console.error('Invalid operator');
        break;
    }
  }
}





