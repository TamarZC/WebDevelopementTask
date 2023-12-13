import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Exam } from 'src/app/Modules/exam.module';
import { ExamsService } from 'src/app/Services/exams.service';
import { Trainee } from 'src/app/Modules/trainee.model';
import { TraineeService } from 'src/app/Services/trainee.service';
import { BaseChartDirective } from 'ng2-charts';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent {
  exams: Exam[] = this.examsService.getExams();
  trainees: Trainee[] = this.traineeService.getTrainees();
  allExamOptions: Exam[] = this.examsService.getExams();
  allSubjectOptions: Exam[] = [];
  filterValues: string[] = [];
  selectedIds: string[] = [];
  selectedSubjects: string[] = [];

  lineChartLabels: string[] = this.exams.map((exam) => exam.ID.toString());
  lineChartData: number[] = this.exams.map((exam) => exam.Average);
  columnChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Average by Trainee ID',
    },
    data: [
      {
        type: 'column',
        dataPoints: this.lineChartLabels.map((label, index) => ({
          label: label,
          y: this.lineChartData[index],
        })),
      },
    ],
  };

  lineChartLabelsSubject: string[] = this.exams.map((exam) => exam.Subject);
  lineChartDataSubject: number[] = this.exams.map((exam) => exam.Average);

  pieChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Averages by Subject',
    },
    theme: 'light2',
    data: [
      {
        type: 'pie',
        dataPoints: this.lineChartLabelsSubject.map((label, index) => ({
          label: label,
          y: this.lineChartDataSubject[index],
        })),
      },
    ],
  };

  lineChartLabelsDate: string[] = this.trainees.map((trainee) => trainee.Date);
  lineChartDataDate: number[] = this.trainees.map((trainee) => trainee.Grade);

  lineChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Grades by Dates',
    },
    theme: 'light2',
    data: [
      {
        type: 'line',
        dataPoints: this.lineChartLabelsDate.map((label, index) => ({
          label: label,
          y: this.lineChartDataDate[index],
        })),
      },
    ],
  };

  constructor(
    private examsService: ExamsService,
    private traineeService: TraineeService
  ) {}

  ngOnInit(): void {
    this.exams = this.examsService.getExams();
    this.trainees = this.traineeService.getTrainees();
    this.allExamOptions = this.examsService.getExams();
  }

  applyIdFilter() {
    this.exams = this.exams.filter((exam) =>
      this.selectedIds.some((id) => exam.ID.toString() == id)
    );

    const dataPoints = this.exams.map((exam) => ({
      label: exam.ID.toString(),
      y: exam.Average,
    }));

    this.columnChartOptions.data[0].dataPoints = dataPoints;
  }

  applySubjectFilter() {
    this.exams = this.exams.filter((exam) =>
      this.selectedSubjects.some(
        (subject) => exam.Subject.toString() == subject
      )
    );
    const dataPoints = this.exams.map((exam) => ({
      label: exam.Subject,
      y: exam.Average,
    }));

    this.pieChartOptions.data[0].dataPoints = dataPoints;
  }
}
