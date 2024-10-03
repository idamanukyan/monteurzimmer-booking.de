import {Component, inject, OnInit} from '@angular/core';
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormDirective} from "ng-zorro-antd/form";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {SearchService} from "../shared/services/search.service";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    NzRowDirective,
    NzColDirective,
    NzFormDirective,
    ReactiveFormsModule,
    NzInputDirective,
    NzDatePickerComponent,
    NzButtonComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);

  public contactForm!: FormGroup;
  public email: string = 'Email: info@dkn-monteurzimmer.de';

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      companyName: [''],
      phone: [''],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      arrivalDate: [null],
      departureDate: [null],
      cityZip: [''],
      numberOfPeople: ['', Validators.required],
      message: [''],
      acceptTerms: [false],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    }
  }
}
