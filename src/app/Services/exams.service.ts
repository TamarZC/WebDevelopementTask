import { Injectable } from '@angular/core';
import { Exam } from '../Modules/exam.module';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  private exams: Exam[] = [];

  constructor() {
    this.exams = [
      {ID: 1, Name: 'Alex', Average: 83, Exams: 6, Subject: "Math"},
      {ID: 2, Name: 'Boris', Average: 63, Exams: 6, Subject: "Algebra"},
      {ID: 3, Name: 'Cindy', Average: 40, Exams: 4, Subject: "Science" },
      {ID: 4, Name: 'David', Average: 93, Exams: 6, Subject: "Analytics" },
      {ID: 5, Name: 'Hudson', Average: 53, Exams: 6, Subject: "Geography" },
      {ID: 6, Name: 'Jacob', Average: 33, Exams: 2, Subject: "Literature" },
      {ID: 7, Name: 'Lorry', Average: 53, Exams: 6, Subject: "English" },
      {ID: 8, Name: 'Moses', Average: 73, Exams: 3, Subject: "Art" },
      {ID: 9, Name: 'Nat', Average: 93, Exams: 6, Subject: "Geometry" },
      {ID: 10, Name: 'Percil', Average: 100, Exams: 6, Subject: "Latin" },
      {ID: 11, Name: 'Tylor', Average: 83, Exams: 6, Subject: "French" }
    ];
  }

  getExams(): Exam[] {
    return this.exams;
  }
}
