import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BaseComponent } from 'src/app/shared/base';

@Component({
  selector: 'app-auto-complete-select-chips',
  templateUrl: './auto-complete-select-chips.component.html',
  styleUrls: ['./auto-complete-select-chips.component.scss'],
})
export class AutoCompleteSelectChipsComponent
  extends BaseComponent
  implements OnInit
{
  @ViewChild('optionInput') optionInput!: ElementRef<HTMLInputElement>;

  @Input() label: string = '';
  @Input() allOptions: string[] = [];
  @Input() options: string[] = [];
  @Output() selectedOptions = new EventEmitter();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  optionCtrl = new FormControl('');
  filteredOptions: Observable<string[]>;

  announcer = inject(LiveAnnouncer);

  constructor() {
    super();
    this.filteredOptions = this.optionCtrl.valueChanges.pipe(
      startWith(null),
      map((option: string | null) =>
        option ? this._filter(option) : this.allOptions.slice()
      )
    );
  }

  ngOnInit(): void {}

  add(event: MatChipInputEvent): void {
    const option = (event.value || '').trim();
    // Add the option to the if it does not exist
    if (option && !this.optionExists(option, this.options)) {
      this.options.push(option);
      this.selectedOptions.emit(option);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.optionCtrl.setValue(null);
  }

  remove(option: string): void {
    const index = this.options.indexOf(option);
    if (index >= 0) {
      this.options.splice(index, 1);
      this.announcer.announce(`Removed ${option}`);
    }
  }

  edit(option: string, event: MatChipEditedEvent): void {
    const value = (event.value || '').trim();
    const index = this.options.indexOf(option);
    // Remove option if it no longer has a title
    if (!value) {
      this.remove(option);
      return;
    }
    // Add the option does not exist
    if (value && index >= 0 && !this.optionExists(value, this.options)) {
      this.options[index] = value;
      this.selectedOptions.emit(value);
    }

    this.optionCtrl.updateValueAndValidity();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const option = event.option.viewValue;
    this.options = this.options || [];
    // Add the option does not exist
    if (!this.optionExists(option, this.options)) {
      this.options.push(option);
    }
    this.optionInput.nativeElement.value = '';
    this.optionCtrl.setValue(null);
  }

  // Helper function to check if a option exists in an array
  optionExists(option: string, array: string[]) {
    return array.includes(option);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
