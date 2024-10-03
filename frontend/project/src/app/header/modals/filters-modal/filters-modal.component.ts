import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {NzModalFooterDirective, NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NgForOf} from "@angular/common";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzSliderComponent} from "ng-zorro-antd/slider";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-filters-modal',
  templateUrl: './filters-modal.component.html',
  styleUrl: './filters-modal.component.scss',
  imports: [
    NzModalFooterDirective,
    NzButtonComponent,
    NgForOf,
    NzCheckboxComponent,
    NzDatePickerComponent,
    NzInputNumberComponent,
    NzOptionComponent,
    NzSelectComponent,
    NzSliderComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FiltersModalComponent implements OnInit, OnDestroy {
  private nzModalRef: NzModalRef = inject(NzModalRef);
  private formBuilder: FormBuilder = inject(FormBuilder);

  @Input() cities: string[] = [];
  @Input() propertyTypes: string[] = [];
  @Input() neighborhoods: string[] = [];

  public filtersForm!: FormGroup;
  public extensionOptions = ['Yes', 'No'];

  ngOnInit() {
    this.initForm();
  }


  private initForm() {
    this.filtersForm = this.formBuilder.group({
      checkInDate: [null],
      checkOutDate: [null],
      numberOfGuests: [1],
      extensionOption: [null],
      propertyType: [null],
      bedCount: [1],
      budget: this.formBuilder.array([0, 1000]),
      neighborhood: [null],
    });
  }

  public onApply() {

  }

  destroyModal(): void {
    this.nzModalRef.destroy();
  }

  ngOnDestroy() {
  }
}
