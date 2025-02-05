import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  map,
  switchMap,
  forkJoin,
  of,
} from 'rxjs';
import { Pokemons } from '../models/pokemons.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private _baseUrl = 'https://pokeapi.co/api/v2';
  private _allPokemons = new BehaviorSubject<Pokemons[]>([]);
  private _isLoading = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {}

  private loadAllPokemons(): Observable<void> {
    if (this._isLoading.value || this._allPokemons.value.length > 0) {
      return of(void 0);
    }

    this._isLoading.next(true);

    return this._http
      .get<{ count: number; results: Pokemons[] }>(
        `${this._baseUrl}/pokemon?limit=1`
      )
      .pipe(
        switchMap((initial) =>
          this._http.get<{ results: Pokemons[] }>(
            `${this._baseUrl}/pokemon?limit=${initial.count}`
          )
        ),
        map((response) => {
          this._allPokemons.next(response.results);
          this._isLoading.next(false);
        })
      );
  }

  getPokemons(
    offset: number = 0,
    limit: number = 20,
    searchTerm: string = ''
  ): Observable<{
    count: number;
    results: Pokemons[];
  }> {
    if (searchTerm) {
      return this.loadAllPokemons().pipe(
        switchMap(() => this._allPokemons),
        map((pokemons) => {
          const filtered = pokemons.filter((pokemon) =>
            this.matchesSearchSequence(pokemon.name, searchTerm)
          );
          return {
            count: filtered.length,
            results: filtered.slice(offset, offset + limit),
          };
        }),
        switchMap((data) => {
          const detailsRequests = data.results.map((pokemon) => {
            const id = this.getIdFromUrl(pokemon.url);
            return this.getPokemonById(Number(id)).pipe(
              map((details) => ({
                ...pokemon,
                types: details.types,
                mainType: details.types[0]?.type.name,
              }))
            );
          });
          return forkJoin(detailsRequests).pipe(
            map((pokemonsWithDetails) => ({
              count: data.count,
              results: pokemonsWithDetails,
            }))
          );
        })
      );
    }

    return this._http
      .get<{ count: number; results: Pokemons[] }>(
        `${this._baseUrl}/pokemon?offset=${offset}&limit=${limit}`
      )
      .pipe(
        switchMap((data) => {
          const detailsRequests = data.results.map((pokemon) => {
            const id = this.getIdFromUrl(pokemon.url);
            return this.getPokemonById(Number(id)).pipe(
              map((details) => ({
                ...pokemon,
                types: details.types,
                mainType: details.types[0]?.type.name,
              }))
            );
          });
          return forkJoin(detailsRequests).pipe(
            map((pokemonsWithDetails) => ({
              count: data.count,
              results: pokemonsWithDetails,
            }))
          );
        })
      );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this._http.get<Pokemon>(`${this._baseUrl}/pokemon/${id}`);
  }

  private getIdFromUrl(url: string): string {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : '1';
  }

  private matchesSearchSequence(name: string, search: string): boolean {
    const normalizedName = name.toLowerCase();
    const normalizedSearch = search.toLowerCase();

    let currentIndex = 0;
    for (const char of normalizedSearch) {
      currentIndex = normalizedName.indexOf(char, currentIndex);
      if (currentIndex === -1) return false;
      currentIndex += 1;
    }
    return true;
  }
}
