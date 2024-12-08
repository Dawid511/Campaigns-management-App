import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from '../../types/campaign.model';
import { CampaignService } from '../campaign/campaign.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss'],
  imports: [CommonModule]
})
export class CampaignCardComponent implements OnInit {
  campaign?: Campaign | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadCampaign(id);
  }

  loadCampaign(id: number): void {
    this.campaign = this.campaignService.getCampaignById(id);
    if (!this.campaign) {
      alert('Campaign not found!');
      this.router.navigate(['/']);
    }
  }

  editCampaign(): void {
    if (this.campaign) {
      this.router.navigate(['/new'], { state: { campaign: this.campaign } });
    }
  }

  deleteCampaign(): void {
    if (this.campaign) {
      this.campaignService.deleteCampaign(this.campaign.id);
      alert('Campaign deleted successfully!');
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
