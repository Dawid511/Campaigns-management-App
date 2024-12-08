export interface Campaign {
    id: number; // Unikalny identyfikator kampanii
    name: string; // Nazwa kampanii (wymagane)
    keywords: string[]; // Lista słów kluczowych (wymagane)
    bidAmount: number; // Minimalna kwota oferty (wymagane)
    campaignFund: number; // Fundusz kampanii (wymagane)
    status: 'on' | 'off'; // Status kampanii (wymagane)
    town: string; // Miasto wybrane z listy (wymagane)
    radius: number; // Promień w kilometrach (wymagane)
}
  