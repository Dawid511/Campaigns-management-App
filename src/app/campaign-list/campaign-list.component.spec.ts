import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign/campaign.service';
import { Campaign } from '../../types/campaign.model';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];
  selectedCampaign: Campaign | null = null;

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.campaigns = this.campaignService.getCampaigns();
  }

  selectCampaign(campaign: Campaign): void {
    this.selectedCampaign = campaign;
    alert(`Wybrano kampanię: ${campaign.name}`);
    // Możesz przekierować lub otworzyć szczegóły kampanii tutaj
  }
}
