import { Component } from '@angular/core';
import { FilterService } from '../filter.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive]
})
export class HeaderComponent {
  constructor(private filterService: FilterService) {}

  // Obsługa dynamicznego wyszukiwania
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filterService.setSearchTerm(input.value); // Przekaż frazę do serwisu na bieżąco
  }
}
