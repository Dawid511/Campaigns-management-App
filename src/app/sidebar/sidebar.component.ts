import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign/campaign.service';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
})
export class SidebarComponent implements OnInit {
  categories: string[] = []; // Kategorie kampanii

  constructor(
    private campaignService: CampaignService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.categories = this.campaignService.getCategories(); // Pobierz kategorie z serwisu
  }

  // Obsługa zmiany kategorii
  // onCategoryChange(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement;
  //   const selectedCategory = selectElement.value;
  //   this.filterService.setCategory(selectedCategory); // Ustaw filtr kategorii
  // }
}
