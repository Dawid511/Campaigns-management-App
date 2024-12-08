import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CampaignService } from '../campaign/campaign.service';
import { Campaign } from '../../types/campaign.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss']
})
export class CampaignFormComponent implements OnInit {
  campaignForm: FormGroup;
  towns: string[] = ['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw', 'Poznan'];
  allKeywords: string[] = ['sale', 'discount', 'promo', 'summer', 'winter', 'festival', 'gifts', 'holiday'];
  filteredKeywords: string[] = [];
  selectedKeywords: string[] = []; 
  isEditMode = false; 
  editingCampaignId: number | null = null; 


  constructor(private fb: FormBuilder, private router: Router, private campaignService: CampaignService) {
    this.campaignForm = this.fb.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
      bidAmount: [1, [Validators.required, Validators.min(1)]],
      campaignFund: [1, [Validators.required, Validators.min(1)]],
      status: ['on', Validators.required],
      town: ['', Validators.required],
      radius: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    const state = history.state;
    if (state && state.campaign) {
      this.isEditMode = true;
      this.editingCampaignId = state.campaign.id;
  
      this.campaignForm.patchValue({
        name: state.campaign.name,
        keywords: state.campaign.keywords.join(', '),
        bidAmount: state.campaign.bidAmount,
        campaignFund: state.campaign.campaignFund,
        status: state.campaign.status,
        town: state.campaign.town,
        radius: state.campaign.radius,
      });
  
      
      this.selectedKeywords = state.campaign.keywords;
    }
  
    this.syncKeywordsWithValidation(); // validation
  }
  

  // kewyords
  onKeywordInput(): void {
    const input = this.campaignForm.get('keywords')?.value.toLowerCase() || '';
    if (input) {
      this.filteredKeywords = this.allKeywords.filter(
        (keyword) => keyword.toLowerCase().includes(input) && !this.selectedKeywords.includes(keyword)
      );
    } else {
      this.filteredKeywords = [];
    }
  }

  // 
  addKeyword(keyword: string): void {
    if (!this.selectedKeywords.includes(keyword)) {
      this.selectedKeywords.push(keyword);
      this.campaignForm.get('keywords')?.setValue('');
      this.filteredKeywords = [];
      this.syncKeywordsWithValidation();
    }
  }

  // 
  removeKeyword(keyword: string): void {
    this.selectedKeywords = this.selectedKeywords.filter((k) => k !== keyword);
    this.syncKeywordsWithValidation();
  }

  // Synch validation
  private syncKeywordsWithValidation(): void {
    if (this.selectedKeywords.length > 0) {
      this.campaignForm.get('keywords')?.setErrors(null);
    } else {
      this.campaignForm.get('keywords')?.setErrors({ required: true });
    }
  }


  
  submitCampaign(): void {
    if (this.campaignForm.valid) {
      const campaignData: Campaign = {
        id: this.editingCampaignId || 0, // chose id to make new or edit
        name: this.campaignForm.get('name')?.value,
        keywords: this.selectedKeywords,
        bidAmount: this.campaignForm.get('bidAmount')?.value,
        campaignFund: this.campaignForm.get('campaignFund')?.value,
        status: this.campaignForm.get('status')?.value,
        town: this.campaignForm.get('town')?.value,
        radius: this.campaignForm.get('radius')?.value,
      };
  
      if (this.isEditMode && this.editingCampaignId !== null) {
        // edit mode
        this.campaignService.updateCampaign(this.editingCampaignId, campaignData);
        alert('Campaign updated successfully!');
      } else {
        // add new moew
        this.campaignService.addCampaign(campaignData);
        alert('New campaign added successfully!');
      }
  
      // reset form 
      this.campaignForm.reset();
      this.selectedKeywords = [];
      this.isEditMode = false;
      this.editingCampaignId = null;

      // move to home (optional this or reset)
      this.router.navigate([`${campaignData.id}`]);
    }
  }
  
}
