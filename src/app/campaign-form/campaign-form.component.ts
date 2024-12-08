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
  towns: string[] = ['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw', 'Poznan']; // Lista miast
  allKeywords: string[] = ['sale', 'discount', 'promo', 'summer', 'winter', 'festival', 'gifts', 'holiday']; // Słowa kluczowe
  filteredKeywords: string[] = []; // Podpowiedzi typu typeahead
  selectedKeywords: string[] = []; // Wybrane słowa kluczowe
  isEditMode = false; // Określa, czy jest tryb edycji
  editingCampaignId: number | null = null; // Przechowuje ID edytowanej kampanii


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
    // Pobierz kampanię z przekazanych danych
    const state = history.state;
    if (state && state.campaign) {
      this.isEditMode = true;
      this.editingCampaignId = state.campaign.id;
  
      // Wypełnij formularz danymi kampanii
      this.campaignForm.patchValue({
        name: state.campaign.name,
        keywords: state.campaign.keywords.join(', '), // Jeśli keywords to tablica, przekształć na ciąg
        bidAmount: state.campaign.bidAmount,
        campaignFund: state.campaign.campaignFund,
        status: state.campaign.status,
        town: state.campaign.town,
        radius: state.campaign.radius,
      });
  
      // Wypełnij wybrane słowa kluczowe
      this.selectedKeywords = state.campaign.keywords;
    }
  
    this.syncKeywordsWithValidation(); // Synchronizuj walidację
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


  
  submitCampaign(): void {
    if (this.campaignForm.valid) {
      const campaignData: Campaign = {
        id: this.editingCampaignId || 0, // Jeśli edytujemy, użyj istniejącego ID
        name: this.campaignForm.get('name')?.value,
        keywords: this.selectedKeywords,
        bidAmount: this.campaignForm.get('bidAmount')?.value,
        campaignFund: this.campaignForm.get('campaignFund')?.value,
        status: this.campaignForm.get('status')?.value,
        town: this.campaignForm.get('town')?.value,
        radius: this.campaignForm.get('radius')?.value,
      };
  
      if (this.isEditMode && this.editingCampaignId !== null) {
        // Tryb edycji - aktualizuj kampanię
        this.campaignService.updateCampaign(this.editingCampaignId, campaignData);
        alert('Campaign updated successfully!');
      } else {
        // Tryb dodawania - dodaj nową kampanię
        this.campaignService.addCampaign(campaignData);
        alert('New campaign added successfully!');
      }
  
      // Resetuj formularz i przekieruj na listę kampanii
      this.campaignForm.reset();
      this.selectedKeywords = [];
      this.isEditMode = false;
      this.editingCampaignId = null;

      this.router.navigate([`${campaignData.id}`]);
    }
  }
  
}
