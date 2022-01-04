import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({selector: 'app-autocomplete', templateUrl: './autocomplete.component.html', styleUrls: ['./autocomplete.component.scss']})
export class AutocompleteComponent implements OnInit {
  myControl: FormControl = new FormControl();
  options: string[] = [
    'Metlife',
    'Morgan Stanley',
    'Berkshire Hathaway',
    'The Blackstone Group',
    'Federal National Mortgage Association',
    'Microsoft',
    'GM',
    'Procter & Gamble',
    'Apollo Global Management',
    'Boeing'
  ];
  filteredOptions: Observable < string[] >;

  constructor() {}

  ngOnInit() {
    this.filteredOptions = this
      .myControl
      .valueChanges
      .pipe(startWith(''), map(value => this._filter(value)));
      
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this
      .options
      .filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
