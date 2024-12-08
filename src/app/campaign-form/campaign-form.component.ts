import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CampaignService } from '../campaign/campaign.service';
import { Campaign } from '../../types/campaign.model';

@Component({
  selector: 'app-campaign-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss']
})
export class CampaignFormComponent implements OnInit {
  campaignForm: FormGroup;
  towns: string[] = ['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw', 'Poznan']; // Lista miast
  allKeywords: string[] = ['sale', 'discount', 'promo', 'summer', 'winter', 'festival', 'gifts', 'holiday']; // Słowa kluczowe
  filteredKeywords: string[] = []; // Podpowiedzi typu typeahead
  selectedKeywords: string[] = []; // Wybrane słowa kluczowe

  constructor(private fb: FormBuilder, private campaignService: CampaignService) {
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
    this.syncKeywordsWithValidation(); // Synchronizuj walidację na starcie
  }

  // Obsługa podpowiedzi dla słów kluczowych
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

  // Dodanie słowa kluczowego
  addKeyword(keyword: string): void {
    if (!this.selectedKeywords.includes(keyword)) {
      this.selectedKeywords.push(keyword);
      this.campaignForm.get('keywords')?.setValue('');
      this.filteredKeywords = [];
      this.syncKeywordsWithValidation();
    }
  }

  // Usunięcie słowa kluczowego
  removeKeyword(keyword: string): void {
    this.selectedKeywords = this.selectedKeywords.filter((k) => k !== keyword);
    this.syncKeywordsWithValidation();
  }

  // Synchronizacja walidacji
  private syncKeywordsWithValidation(): void {
    if (this.selectedKeywords.length > 0) {
      this.campaignForm.get('keywords')?.setErrors(null);
    } else {
      this.campaignForm.get('keywords')?.setErrors({ required: true });
    }
  }

  // Dodanie kampanii do serwisu
  addCampaign(): void {
    if (this.campaignForm.valid) {
      const newCampaign: Campaign = {
        id: 0, // ID zostanie wygenerowane przez serwis
        name: this.campaignForm.get('name')?.value,
        keywords: this.selectedKeywords,
        bidAmount: this.campaignForm.get('bidAmount')?.value,
        campaignFund: this.campaignForm.get('campaignFund')?.value,
        status: this.campaignForm.get('status')?.value,
        town: this.campaignForm.get('town')?.value,
        radius: this.campaignForm.get('radius')?.value,
      };

      // Dodaj kampanię do mockowanych danych za pomocą serwisu
      this.campaignService.addCampaign(newCampaign);

      // Loguj aktualne dane
      console.log('Mocked Campaigns:', this.campaignService.getCampaigns());

      // Reset formularza i słów kluczowych
      this.campaignForm.reset();
      this.selectedKeywords = [];
    }
  }
}
