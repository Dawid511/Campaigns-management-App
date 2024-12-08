import { CommonModule } from '@angular/common';
import { Component, Input  } from '@angular/core';
import { Campaign } from '../../types/campaign.model';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss'
})

export class CampaignComponent {
  @Input() campaign!: Campaign;
}