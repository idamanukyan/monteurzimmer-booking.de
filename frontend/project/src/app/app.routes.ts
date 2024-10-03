import {Routes} from '@angular/router';
import {SearchResultComponent} from "./search-result/search-result.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {CityWithPropertiesComponent} from "./cities/city-with-properties/city-with-properties.component";
import {NewsletterComponent} from "./newsletter/newsletter.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";

export const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'search-results', component: SearchResultComponent},
  {path: 'city', component: CityWithPropertiesComponent},
  {path: 'newsletter', component: NewsletterComponent},
  {path: 'contact-us', component: ContactUsComponent},


];
