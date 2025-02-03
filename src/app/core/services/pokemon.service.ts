import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemons } from '../models/pokemons.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private _baseUrl = 'https://pokeapi.co/api/v2';
  private _currentPokemons: Pokemons[] = [];
  private _observers: ((pokemons: Pokemons[]) => void)[] = [];

  constructor(private _http: HttpClient) {}

  async getPokemons(
    offset: number = 0,
    limit: number = 20
  ): Promise<{
    count: number;
    results: Pokemons[];
  }> {
    return new Promise((resolve, reject) => {
      this._http
        .get<{ count: number; results: Pokemons[] }>(
          `${this._baseUrl}/pokemon?offset=${offset}&limit=${limit}`
        )
        .subscribe({
          next: (data) => {
            this._currentPokemons = data.results;
            this.notifyObservers(data.results);
            resolve(data);
          },
          error: (error) =>
            reject(new Error('Pas de données reçues: ' + error)),
        });
    });
  }

  async getPokemonById(id: number): Promise<Pokemon> {
    return new Promise((resolve, reject) => {
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

  searchPokemons(searchTerm: string): void {
    const filteredPokemons = this._currentPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.notifyObservers(filteredPokemons);
  }
}
