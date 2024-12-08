import { Routes } from '@angular/router';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { AboutComponent } from './about/about.component';
import { CampaignCardComponent } from './campaign-card/campaign-card.component';

export const routes: Routes = [
    {
        path: '',
        component: CampaignListComponent
    },
    {
        path: 'new',
                component: CampaignFormComponent
    },
    {
        path: 'about',
        component: AboutComponent
      },
      {
        path: ':id',
        component: CampaignCardComponent
      },
    { 
        path: '**',
        component: CampaignListComponent 
    }
    
];