
import { RouterOutlet, RouterLink } from '@angular/router';
import { CampaignListComponent } from "./campaign-list/campaign-list.component";
import { HeaderComponent } from "./header/header.component";
import { CampaignFormComponent } from "./campaign-form/campaign-form.component";
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule, SidebarComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Campaign manegement';
  selectedCategory: string = ''; // Wybrana kategoria
  isSidebarOpen: boolean = true; // Domyślnie sidebar jest otwarty
  isDesktop: boolean = true; // Domyślne sprawdzenie desktop

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      // Ustaw wstępną wartość dla desktop na podstawie okna
      this.isDesktop = window.innerWidth >= 768;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (isPlatformBrowser(this.platformId)) {
      const width = event.target.innerWidth;
      this.isDesktop = width >= 768;
      if (!this.isDesktop) {
        this.isSidebarOpen = false; // Ukryj sidebar na mniejszych ekranach
      }
    }
  }

  // Przełącz widoczność sidebaru
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
