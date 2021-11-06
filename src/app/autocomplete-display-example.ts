import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface User {
  name: string;
  value: string;
}

/**
 * @title Display value autocomplete
 */
@Component({
  selector: 'autocomplete-display-example',
  templateUrl: 'autocomplete-display-example.html',
  styleUrls: ['autocomplete-display-example.css'],
})
export class AutocompleteDisplayExample implements OnInit {
  myControl = new FormControl();
  options: User[] = [
    { name: 'Cedula Ciudadania', value: '123456789' },
    { name: 'Nit', value: '159357852' },
    { name: 'Cedula Extranjeria', value: '987654321' },
    { name: 'Tarjeta Identidad', value: '147258369' },
    { name: 'Pasaporte', value: '963852741' },
    { name: 'Cedula Ciudadania', value: '321456987' },
    { name: 'Tarjeta Identidad', value: '852369741' },
    { name: 'Pasaporte', value: '159753258' },
    { name: 'Cedula Extrabjeria', value: '147963258' },
  ];
  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );
  }

  /**
   * mostrar el elegido
   */
  displayFn(user?: User): string | undefined {
    console.log('imprimir: ', user ? user.value : '');
    return user ? user.name : undefined;
  }

  returnFn(user?: User): string | undefined {
    return user ? user.value : undefined;
  }

  /**
   * Metodo de busqueda
   */
  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
