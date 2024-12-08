import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign/campaign.service';
import { Campaign } from '../../types/campaign.model';
import { CommonModule } from '@angular/common'; // Do obsługi dyrektyw Angular
import { CampaignComponent } from '../campaign/campaign.component';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
  standalone: true,
  imports: [CommonModule, CampaignComponent], // Zaimportowanie CampaignComponent
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.campaigns = this.campaignService.getCampaigns();
  }

  get paginatedCampaigns(): Campaign[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.campaigns.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.campaigns.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
