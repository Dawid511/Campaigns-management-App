import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CampaignListComponent } from "./campaign-list/campaign-list.component";
import { HeaderComponent } from "./header/header.component";
import { CampaignFormComponent } from "./campaign-form/campaign-form.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent, NavbarComponent, CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Campaign manegement';
}
