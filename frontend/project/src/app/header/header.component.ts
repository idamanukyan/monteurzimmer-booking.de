import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {NzPageHeaderComponent} from "ng-zorro-antd/page-header";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzHeaderComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NzModalModule, NzModalService} from "ng-zorro-antd/modal";
import {FiltersModalComponent} from "./modals/filters-modal/filters-modal.component";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import * as querystring from "node:querystring";

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    NzPageHeaderComponent,
    NzMenuDirective,
    NzMenuItemComponent,

    NzLayoutComponent,
    NzHeaderComponent,
    NzButtonComponent,
    NzIconDirective,
    NzInputDirective,
    NzInputGroupComponent,
    ReactiveFormsModule,
    NzModalModule,
    NgIf

  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private router: Router = inject(Router);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private modalService: NzModalService = inject(NzModalService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  @Input() isSearch: boolean = false;
  @Input() removeInput: boolean = false;
  @Input() removeContactUs: boolean = false;
  public searchForm!: FormGroup;
  private cities: string[] = ['City1', 'City2', 'City3'];
  private propertyTypes: string[] = [];
  private neighborhoods: string[] = [];

  private destroy$: any;

  ngOnInit() {
    this.initForm();

    this.route.queryParams.subscribe(params => {
      const searchQuery = params['searchQuery'] ?? '';
      this.searchForm.patchValue({
        searchQuery: searchQuery
      });
    });
  }

  private initForm() {
    this.searchForm = this.formBuilder.group({
      searchQuery: [''],
      selectedCity: [null],
      checkInDate: [null],
      checkOutDate: [null],
      numberOfGuests: [1],
      extensionOption: [null],
      propertyType: [null],
      bedCount: [1],
      budget: this.formBuilder.array([0, 1000]),
      facilities: this.formBuilder.group({
        wifi: [false],
        parking: [false]
      }),
      neighborhood: [null],
    });
  }


  public onOpenFilters() {
    const modalRef = this.modalService.create({
      nzTitle: 'Add Filters',
      nzContent: FiltersModalComponent
    })
    modalRef.componentInstance!.cities = this.cities;
    modalRef.componentInstance!.propertyTypes = this.propertyTypes;
    modalRef.componentInstance!.neighborhoods = this.neighborhoods;
  }


  public onSearch() {
    const queryParams = {
      searchQuery: this.searchForm.get('searchQuery')?.value
    };

    if (!this.isSearch) {
      this.router.navigate(['/city'], {queryParams});
      return;
    }
    this.getSearchInfo();
  }

  private getSearchInfo() {

  }
  public goContactUs(){
    this.router.navigate(['/contact-us']);
  }

  ngOnDestroy() {
    // this.destroy$.unsubscribe();
  }
}
