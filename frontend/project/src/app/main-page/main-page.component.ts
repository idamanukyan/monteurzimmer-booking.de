import {SliderComponent} from "../slider/slider.component";
import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {AboutUsComponent} from "../about-us/about-us.component";
import {CitiesComponent} from "../cities/cities.component";
import {FavoriteCitiesComponent} from "../favorite-cities/favorite-cities.component";
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {Router} from "@angular/router";
import {SearchService} from "../shared/services/search.service";

interface Bookmark {
    title: string;
    description: string;
    imageUrl: string;
}

@Component({
    standalone: true,
    selector: 'app-main-page',
    imports: [
        AboutUsComponent,
        CitiesComponent,
        FavoriteCitiesComponent,
        FooterComponent,
        HeaderComponent,
        SliderComponent,
        NzButtonComponent
    ],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
    private router: Router = inject(Router);
    private searchService: SearchService = inject(SearchService);

    public bookmarks: Bookmark[] = [
        {
            title: 'Berlin',
            description: '2540 options',
            imageUrl: 'assets/berlin.jpg'
        },
        {
            title: 'Leipzig',
            description: '1640 options',
            imageUrl: 'assets/img.png'
        },
        {
            title: 'Berlin',
            description: '2540 options',
            imageUrl: 'assets/berlin.jpg'
        },
        {
            title: 'Berlin',
            description: '2540 options',
            imageUrl: 'assets/berlin.jpg'
        },
        {
            title: 'Leipzig',
            description: '1640 options',
            imageUrl: 'assets/img.png'
        },
        {
            title: 'Berlin',
            description: '2540 options',
            imageUrl: 'assets/berlin.jpg'
        },
        {
            title: 'Berlin',
            description: '2540 options',
            imageUrl: 'assets/berlin.jpg'
        }
    ];
    public favoriteCities: any[] = [];

    ngOnInit() {
        this.getFavoriteCities();
    }
    private getFavoriteCities() {
        this.searchService.getFavorites()
            // .pipe((takeUntil(this.destroy$)))
            .subscribe((res) => {
                this.favoriteCities = res;
                console.log(555, res);
            })
    }

    public goToNewsletterPage() {
        this.router.navigate(['/newsletter']);

    }
}
