import { CommonModule } from '@angular/common';
import { Component, Input  } from '@angular/core';
import { Campaign } from '../../types/campaign.model';

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss'
})

export class CampaignComponent {
  @Input() campaign!: Campaign;
}