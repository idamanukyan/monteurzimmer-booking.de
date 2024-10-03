import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NgForOf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalService} from "ng-zorro-antd/modal";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [
    HeaderComponent,
    NzFormDirective,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputDirective,
    NzRowDirective,
    NzColDirective,
    NzSelectComponent,
    NzOptionComponent,
    NgForOf,
    NzButtonComponent,
    FooterComponent
  ],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss'
})
export class NewsletterComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);


  public newsletterForm!: FormGroup;
  public days: number[] = Array.from({length: 31}, (v, k) => k + 1);
  public months = [
    {name: 'Januar', value: 1},
    {name: 'Februar', value: 2},
    {name: 'März', value: 3},
    {name: 'April', value: 4},
    {name: 'Mai', value: 5},
    {name: 'Juni', value: 6},
    {name: 'Juli', value: 7},
    {name: 'August', value: 8},
    {name: 'September', value: 9},
    {name: 'Oktober', value: 10},
    {name: 'November', value: 11},
    {name: 'Dezember', value: 12},
  ];
  public years: number[] = Array.from({length: 100}, (v, k) => new Date().getFullYear() - k);


  ngOnInit(): void {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      day: [null, Validators.required],
      month: [null, Validators.required],
      year: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.newsletterForm.valid) {
      console.log(this.newsletterForm.value);
    }
  }
}
