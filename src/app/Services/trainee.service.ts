// trainee.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Trainee } from '../Modules/trainee.model';

@Injectable({
  providedIn: 'root',
})
export class TraineeService {
  private dataSource: Trainee[] = [];
  private filteredTraineesSubject: BehaviorSubject<Trainee[]> = new BehaviorSubject<Trainee[]>([]);
  filteredTrainees$: Observable<Trainee[]> = this.filteredTraineesSubject.asObservable();

  constructor() {
    // Initialize trainees or load them from an API
    // Example initialization:
    this.dataSource = [
      {ID: 1, Name: 'Alex', Date: '12/01/2023', Grade: 90, Subject: 'Algebra', Email: '', Address: '', City: '', Country: '', ZIP: ''},
      {ID: 2, Name: 'Boris', Date: '12/01/2023', Grade: 100, Subject: 'Math', Email: '', Address: '', City: '', Country: '', ZIP: ''},
      {ID: 3, Name: 'Cindy', Date: '12/01/2023', Grade: 50, Subject: 'Analytics', Email: '', Address: '', City: '', Country: '', ZIP: ''},
      {ID: 4, Name: 'David', Date: '12/01/2023', Grade: 90, Subject: 'English', Email: '', Address: '', City: '', Country: '', ZIP: ''},
      {ID: 5, Name: 'Hudson', Date: '12/01/2023', Grade: 40, Subject: 'Geography', Email: '', Address: '', City: '', Country: '', ZIP: ''},
      {ID: 6, Name: 'Jacob', Date: '12/01/2023', Grade: 90, Subject: 'Statistics', Email: '', Address: '', City: '', Country: '', ZIP: ''},
      {ID: 7, Name: 'Lorry', Date: '12/01/2023', Grade: 30, Subject: 'Algebra', Email: '', Address: '', City: '', Country: '', ZIP: ''},
      {ID: 8, Name: 'Moses', Date: '12/01/2023', Grade: 90, Subject: 'Literature', Email: '', Address: '', City: '', Country: '', ZIP: ''},
      {ID: 9, Name: 'Nat', Date: '12/01/2023', Grade: 70, Subject: 'Art', Email: '', Address: '', City: '', Country: '', ZIP: ''},
      {ID: 10, Name: 'Percil', Date: '12/01/2023', Grade: 80, Subject: 'Physics', Email: '', Address: '', City: '', Country: '', ZIP: ''},
      {ID: 11, Name: 'Tylor', Date: '12/01/2023', Grade: 90, Subject: 'Algebra', Email: '', Address: '', City: '', Country: '', ZIP: ''}
    ];

    // Set the initial filtered trainees
    this.updateFilteredTrainees([]);
  }

  getTrainees(): Trainee[] {
    return this.dataSource;
  }

  addTrainee(trainee: Trainee): void {
    this.dataSource.push(trainee);
  }

  deleteTrainee(traineeId: number): void {
    const index = this.dataSource.findIndex((t) => t.ID === traineeId);
    if (index !== -1) {
      this.dataSource.splice(index, 1);
    }
  }

  editTrainee(updatedTrainee: Trainee): void {
    const index = this.dataSource.findIndex((t) => t.ID === updatedTrainee.ID);
    if (index !== -1) {
      this.dataSource[index] = { ...this.dataSource[index], ...updatedTrainee };
    }
  }

  private updateFilteredTrainees(selectedIds: number[]): void {
    if (selectedIds.length === 0) {
      // No filter, show all trainees
      this.filteredTraineesSubject.next(this.dataSource);
    } else {
      // Filter trainees based on selected IDs
      const filteredTrainees = this.dataSource.filter(dataSource => selectedIds.includes(dataSource.ID));
      this.filteredTraineesSubject.next(filteredTrainees);
    }
  }

  // Set the selected IDs and update the filtered trainees
  setSelectedIds(selectedIds: number[]): void {
    this.updateFilteredTrainees(selectedIds);
  }
}
