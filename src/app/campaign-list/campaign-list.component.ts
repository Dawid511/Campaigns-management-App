import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign/campaign.service';
import { Campaign } from '../../types/campaign.model';
import { CommonModule } from '@angular/common'; // Do obsługi dyrektyw Angular
import { CampaignComponent } from '../campaign/campaign.component';
import { FilterService } from '../filter.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
  standalone: true,
  imports: [CommonModule, CampaignComponent, RouterLink], // Zaimportowanie CampaignComponent
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = []; // Wszystkie kampanie
  filteredCampaigns: Campaign[] = []; // Filtrowane kampanie
  paginatedCampaigns: Campaign[] = []; // Kampanie na bieżącej stronie
  currentPage: number = 1; // Aktualna strona
  itemsPerPage: number = 15; // Liczba elementów na stronie

  constructor(
    private campaignService: CampaignService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.campaigns = this.campaignService.getCampaigns(); // Pobierz wszystkie kampanie
    this.filteredCampaigns = this.campaigns; // Domyślnie wyświetlaj wszystkie kampanie
    this.updatePagination();

    // Nasłuchuj zmiany wyszukiwania
    this.filterService.search$.subscribe((searchTerm) => {
      this.filteredCampaigns = this.campaigns.filter((campaign) =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.currentPage = 1; // Resetuj stronę
      this.updatePagination();
    });
  }

  // Aktualizacja paginacji
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCampaigns = this.filteredCampaigns.slice(startIndex, endIndex);
  }

  // Przejście do następnej strony
  nextPage(): void {
    if (this.currentPage < Math.ceil(this.filteredCampaigns.length / this.itemsPerPage)) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  // Przejście do poprzedniej strony
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
