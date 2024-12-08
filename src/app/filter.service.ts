import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private searchSource = new BehaviorSubject<string>(''); // Aktualna fraza wyszukiwania
  search$ = this.searchSource.asObservable();

  setSearchTerm(searchTerm: string): void {
    this.searchSource.next(searchTerm); // Aktualizuj frazę
  }
}
