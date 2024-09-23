import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NgForOf} from "@angular/common";
import {NzSliderComponent} from "ng-zorro-antd/slider";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";

@Component({
  standalone: true,
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  imports: [
    NzInputGroupComponent,
    NzInputDirective,
    FormsModule,
    NzIconDirective,
    NzSelectComponent,
    NzOptionComponent,
    NzDatePickerComponent,
    NzInputNumberComponent,
    NgForOf,
    NzSliderComponent,
    NzCheckboxComponent,
    ReactiveFormsModule,
    NzButtonComponent

  ]
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private formBuilder: FormBuilder = inject(FormBuilder);

  public searchForm!: FormGroup;
  cities = ['City1', 'City2', 'City3'];
  extensionOptions = ['Yes', 'No'];
  propertyTypes = ['Apartment', 'House', 'Studio'];
  neighborhoods = ['Neighborhood1', 'Neighborhood2'];


  ngOnInit() {
    this.initForm();
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


public onSearch() {
  // Implement search logic here
  console.log(this.searchForm);
}

ngOnDestroy() {
}
}
