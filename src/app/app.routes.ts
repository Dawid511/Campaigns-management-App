import { Routes } from '@angular/router';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';

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
        path: '**',
        component: CampaignListComponent 
    }
    
];

// export const routes: Routes = [
//     {
//         path: '',
//         component: AppComponent,
//         children: [
//             {
//                 path: '',
//                 component: CampaignListComponent
//             },
//             {
//                 path: 'new',
//                 component: CampaignFormComponent
//             }
//         ]
//     }
    
// ];
