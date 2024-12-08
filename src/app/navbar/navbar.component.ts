import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
})
export class NavbarComponent {
  menuOpen = false;

  // Emitujemy event filtrowania do rodzica
  @Output() filterChange = new EventEmitter<string>();

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  onFilterChange(event: Event): void {
    const input = event.target as HTMLInputElement; // Określenie typu target jako HTMLInputElement
    this.filterChange.emit(input.value); // Emitowanie wartości pola
  }
  
}
