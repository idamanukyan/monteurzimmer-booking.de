import {AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NzCarouselComponent, NzCarouselContentDirective} from "ng-zorro-antd/carousel";
import {NgForOf, NgStyle} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {Router} from "@angular/router";

@Component({
    standalone: true,
    selector: 'app-slider',
    imports: [
        NgStyle,
        NgForOf,
        NzButtonComponent,
        NzCarouselComponent,
        NzCarouselContentDirective
    ],
    templateUrl: './slider.component.html',
    styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit, AfterViewInit {
    private router: Router = inject(Router);

    public carouselItems: any[] = [];
    public effect = 'scrollx';
    private destroy$: any;

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        // this.getFavoriteProperty();
        this.cdr.markForCheck();

    }

    ngAfterViewInit() {
        console.log(this.carouselItems)
        setTimeout(() => {
            this.cdr.detectChanges();
        }, 0);
    }


}
