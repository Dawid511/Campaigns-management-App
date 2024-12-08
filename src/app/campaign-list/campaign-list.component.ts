import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign/campaign.service';
import { Campaign } from '../../types/campaign.model';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from '../campaign/campaign.component';
import { FilterService } from '../filter.service';


@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
  standalone: true,
  imports: [CommonModule, CampaignComponent],
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];
  filteredCampaigns: Campaign[] = [];
  paginatedCampaigns: Campaign[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 15;

  constructor(
    private campaignService: CampaignService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.campaigns = this.campaignService.getCampaigns();
    this.filteredCampaigns = this.campaigns; 
    this.updatePagination();

    this.filterService.search$.subscribe((searchTerm) => {
      this.filteredCampaigns = this.campaigns.filter((campaign) =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.currentPage = 1;
      this.updatePagination();
    });
  }

  // update pagination
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCampaigns = this.filteredCampaigns.slice(startIndex, endIndex);
  }

  // previous page
  nextPage(): void {
    if (this.currentPage < Math.ceil(this.filteredCampaigns.length / this.itemsPerPage)) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  // next page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
