import { Injectable } from '@angular/core';
import { Campaign } from '../../types/campaign.model';
import { RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private campaigns: Campaign[] = [
      {
        id: 1,
        name: 'Summer Sale',
        keywords: ['sale', 'discount', 'summer'],
        bidAmount: 10,
        campaignFund: 500,
        status: 'on',
        town: 'Warsaw',
        radius: 15,
      },
      {
        id: 2,
        name: 'Winter Promo',
        keywords: ['winter', 'christmas', 'promo'],
        bidAmount: 15,
        campaignFund: 800,
        status: 'off',
        town: 'Krakow',
        radius: 20,
      },
      {
        id: 3,
        name: 'Spring Awakening',
        keywords: ['spring', 'nature', 'flowers'],
        bidAmount: 5,
        campaignFund: 300,
        status: 'on',
        town: 'Gdansk',
        radius: 10,
      },
      {
        id: 4,
        name: 'Autumn Fest',
        keywords: ['autumn', 'fall', 'festival'],
        bidAmount: 8,
        campaignFund: 400,
        status: 'on',
        town: 'Wroclaw',
        radius: 18,
      },
      {
        id: 5,
        name: 'Black Friday Deals',
        keywords: ['black friday', 'deals', 'discounts'],
        bidAmount: 20,
        campaignFund: 1000,
        status: 'on',
        town: 'Poznan',
        radius: 25,
      },
      {
        id: 6,
        name: 'Holiday Specials',
        keywords: ['holiday', 'gifts', 'seasonal'],
        bidAmount: 12,
        campaignFund: 600,
        status: 'off',
        town: 'Lodz',
        radius: 12,
      },
      {
        id: 7,
        name: 'Easter Bonanza',
        keywords: ['easter', 'sale', 'special'],
        bidAmount: 6,
        campaignFund: 350,
        status: 'on',
        town: 'Warsaw',
        radius: 8,
      },
      {
        id: 8,
        name: 'Back to School',
        keywords: ['school', 'stationery', 'discount'],
        bidAmount: 9,
        campaignFund: 450,
        status: 'off',
        town: 'Krakow',
        radius: 10,
      },
      {
        id: 9,
        name: 'Summer Splash',
        keywords: ['beach', 'summer', 'fun'],
        bidAmount: 14,
        campaignFund: 700,
        status: 'on',
        town: 'Gdansk',
        radius: 30,
      },
      {
        id: 10,
        name: 'Halloween Party',
        keywords: ['halloween', 'costumes', 'party'],
        bidAmount: 11,
        campaignFund: 550,
        status: 'on',
        town: 'Wroclaw',
        radius: 15,
      },
      {
        id: 11,
        name: 'Cyber Monday',
        keywords: ['cyber monday', 'electronics', 'deals'],
        bidAmount: 18,
        campaignFund: 1200,
        status: 'off',
        town: 'Poznan',
        radius: 22,
      },
      {
        id: 12,
        name: 'Valentine’s Offers',
        keywords: ['valentine', 'love', 'gift'],
        bidAmount: 7,
        campaignFund: 380,
        status: 'on',
        town: 'Lodz',
        radius: 12,
      },
      {
        id: 13,
        name: 'New Year Deals',
        keywords: ['new year', 'celebration', 'offers'],
        bidAmount: 16,
        campaignFund: 900,
        status: 'on',
        town: 'Warsaw',
        radius: 18,
      },
      {
        id: 14,
        name: 'Fitness Frenzy',
        keywords: ['fitness', 'gym', 'equipment'],
        bidAmount: 8,
        campaignFund: 400,
        status: 'off',
        town: 'Krakow',
        radius: 10,
      },
      {
        id: 15,
        name: 'Gadget Week',
        keywords: ['gadgets', 'technology', 'electronics'],
        bidAmount: 17,
        campaignFund: 950,
        status: 'on',
        town: 'Gdansk',
        radius: 20,
      },
      {
        id: 16,
        name: 'Organic Sale',
        keywords: ['organic', 'food', 'eco-friendly'],
        bidAmount: 6,
        campaignFund: 300,
        status: 'on',
        town: 'Wroclaw',
        radius: 8,
      },
      {
        id: 17,
        name: 'Pet Lovers',
        keywords: ['pets', 'accessories', 'sale'],
        bidAmount: 5,
        campaignFund: 280,
        status: 'off',
        town: 'Poznan',
        radius: 15,
      },
      {
        id: 18,
        name: 'Book Festival',
        keywords: ['books', 'reading', 'festival'],
        bidAmount: 4,
        campaignFund: 220,
        status: 'on',
        town: 'Lodz',
        radius: 7,
      },
      {
        id: 19,
        name: 'Luxury Deals',
        keywords: ['luxury', 'sale', 'exclusive'],
        bidAmount: 25,
        campaignFund: 1500,
        status: 'on',
        town: 'Warsaw',
        radius: 35,
      },
      {
        id: 20,
        name: 'Outdoor Adventure',
        keywords: ['adventure', 'outdoor', 'gear'],
        bidAmount: 13,
        campaignFund: 680,
        status: 'off',
        town: 'Krakow',
        radius: 25,
      },
      {
        id: 21,
        name: 'Luxury Dealssds',
        keywords: ['luxury', 'sale', 'exclusive'],
        bidAmount: 252,
        campaignFund: 1500,
        status: 'on',
        town: 'Warsaw',
        radius: 35,
      },
      {
        id: 22,
        name: 'Outdoor Adventuresdsd',
        keywords: ['adventure', 'outdoor', 'gear'],
        bidAmount: 132,
        campaignFund: 680,
        status: 'off',
        town: 'Krakow',
        radius: 25,
      },
  ];

  private towns: string[] = ['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw', 'Poznan']; // Lista miast

  constructor() {}

  // Pobierz wszystkie kampanie
  getCampaigns(): Campaign[] {
    return this.campaigns;
  }

  // Pobierz pojedynczą kampanię na podstawie ID
  getCampaignById(id: number): Campaign | undefined {
    return this.campaigns.find((campaign) => campaign.id === id);
  }

  // Dodaj nową kampanię
  addCampaign(campaign: Campaign): void {
    campaign.id = this.generateId();
    this.campaigns.push(campaign);
  }

  updateCampaign(id: number, updatedCampaign: Campaign): void {
    const index = this.campaigns.findIndex((campaign) => campaign.id === id);
    if (index !== -1) {
      this.campaigns[index] = { ...updatedCampaign, id }; // Zachowaj ID
    }
  }
  
  

  // Usuń kampanię
  deleteCampaign(id: number): void {
    this.campaigns = this.campaigns.filter((campaign) => campaign.id !== id);
  }

  // Pobierz listę miast
  getTowns(): string[] {
    return this.towns;
  }

  // Wygeneruj unikalne ID dla nowej kampanii
  private generateId(): number {
    return this.campaigns.length > 0
      ? Math.max(...this.campaigns.map((campaign) => campaign.id)) + 1
      : 1;
  }

  // Pobierz unikalne kategorie (keywords)
  getCategories(): string[] {
    const allKeywords = this.campaigns.flatMap(campaign => campaign.keywords);
    return Array.from(new Set(allKeywords)); // Usuń duplikaty
  }
}
