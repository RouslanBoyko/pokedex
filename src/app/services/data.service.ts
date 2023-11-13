import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  constructor(
    private http: HttpClient
  ) { }

  // get pokemons 

  getPokemons(offset: number, limit: number): Observable<any> {
    const url = `${this.apiUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get(url);
  }

  OnNextData(offset: number, limit: number): Observable<any>{
    const url = `${this.apiUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get(url);
  }

  OnPreviousData(offset: number, limit: number): Observable<any>{
    const url = `${this.apiUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get(url);
  }

  // get more pokemons data
  getMoreData(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}