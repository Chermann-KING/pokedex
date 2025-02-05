import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemons } from '../models/pokemons.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  // private _baseUrl = 'https://pokeapi.co/api/v2';
  // private _baseUrl = '/api/pokemon';
  private _baseUrl = 'https://pokedex-pi-fawn.vercel.app/api/pokemon';

  private _allPokemons: Pokemons[] = [];
  private _observers: ((pokemons: Pokemons[]) => void)[] = [];
  private _totalCount = 0;
  private _isLoading = false;

  constructor(private _http: HttpClient) {}

  private async loadAllPokemons(): Promise<void> {
    if (this._isLoading || this._allPokemons.length > 0) return;

    this._isLoading = true;
    try {
      const initial = await new Promise<{ count: number; results: Pokemons[] }>(
        (resolve, reject) => {
          this._http
            .get<{ count: number; results: Pokemons[] }>(
              `${this._baseUrl}/pokemon?limit=1`
            )
            .subscribe({
              next: (data) => resolve(data),
              error: (error) => reject(error),
            });
        }
      );

      this._totalCount = initial.count;

      const response = await new Promise<{ results: Pokemons[] }>(
        (resolve, reject) => {
          this._http
            .get<{ results: Pokemons[] }>(
              `${this._baseUrl}/pokemon?limit=${this._totalCount}`
            )
            .subscribe({
              next: (data) => resolve(data),
              error: (error) => reject(error),
            });
        }
      );

      this._allPokemons = response.results;
    } catch (error) {
      console.error('Erreur lors du chargement des Pokémons:', error);
    } finally {
      this._isLoading = false;
    }
  }

  async getPokemons(
    offset: number = 0,
    limit: number = 20,
    searchTerm: string = ''
  ): Promise<{
    count: number;
    results: Pokemons[];
  }> {
    // Si on a un terme de recherche et que tous les Pokémons ne sont pas encore chargés
    if (searchTerm && this._allPokemons.length === 0) {
      await this.loadAllPokemons();
    }

    // Si on a un terme de recherche et qu'on a tous les Pokémons
    if (searchTerm && this._allPokemons.length > 0) {
      const filteredPokemons = this._allPokemons.filter((pokemon) =>
        this.matchesSearchSequence(pokemon.name, searchTerm)
      );

      // Récupérer les détails pour chaque Pokémon filtré
      const pokemonsWithDetails = await Promise.all(
        filteredPokemons.map(async (pokemon) => {
          const id = this.getIdFromUrl(pokemon.url);
          const details = await this.getPokemonById(Number(id));
          return {
            ...pokemon,
            types: details.types,
            mainType: details.types[0]?.type.name,
          };
        })
      );

      return {
        count: filteredPokemons.length,
        results: pokemonsWithDetails.slice(offset, offset + limit),
      };
    }

    // Si on n'a pas de terme de recherche ou si tous les Pokémons ne sont pas encore chargés
    const data = await new Promise<{ count: number; results: Pokemons[] }>(
      (resolve, reject) => {
        this._http
          .get<{ count: number; results: Pokemons[] }>(
            `${this._baseUrl}/pokemon?offset=${offset}&limit=${limit}`
          )
          .subscribe({
            next: (data) => resolve(data),
            error: (error) =>
              reject(new Error('Pas de données reçues: ' + error)),
          });
      }
    );

    // Ajouter les détails pour chaque Pokémon
    const pokemonsWithDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const id = this.getIdFromUrl(pokemon.url);
        const details = await this.getPokemonById(Number(id));
        return {
          ...pokemon,
          types: details.types,
          mainType: details.types[0]?.type.name,
        };
      })
    );

    return {
      count: data.count,
      results: pokemonsWithDetails,
    };
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

  async getPokemonById(id: number): Promise<Pokemon> {
    return new Promise<Pokemon>((resolve, reject) => {
      this._http.get<Pokemon>(`${this._baseUrl}/pokemon/${id}`).subscribe({
        next: (pokemon) => resolve(pokemon),
        error: (error) => reject(new Error('Pokemon non trouvé: ' + error)),
      });
    });
  }

  subscribe(callback: (pokemons: Pokemons[]) => void): void {
    this._observers.push(callback);
  }

  unsubscribe(callback: (pokemons: Pokemons[]) => void): void {
    const index = this._observers.indexOf(callback);
    if (index !== -1) {
      this._observers.splice(index, 1);
    }
  }

  private notifyObservers(pokemons: Pokemons[]): void {
    this._observers.forEach((observer) => observer(pokemons));
  }
}
