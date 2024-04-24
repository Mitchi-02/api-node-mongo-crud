import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './updateItem.component.html',
  styleUrl: './updateItem.component.css',
})
export class UpdateItemComponent {
  f2 = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
  });
  get name() {
    return this.f2.get('name');
  }
  get description() {
    return this.f2.get('description');
  }

  constructor(private itemService: ItemsService) {
    this.itemService.show('id').subscribe((response) => {
      this.f2.setValue({
        name: response.data.name,
        description: response.data.description,
      });
    });
  }

  onSubmit() {
    this.itemService
      .update('id', {
        name: this.f2.value.name ?? '',
        description: this.f2.value.description ?? '',
      })
      .subscribe((response) => {
        console.log(response);
      });
  }
}