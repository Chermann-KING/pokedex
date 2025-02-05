import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { Pokemons } from '../../../../core/models/pokemons.model';
import { Pokemon } from '../../../../core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-page',
  standalone: false,

  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.scss',
})
export class PokemonPageComponent implements OnInit, OnDestroy {
  pokemons: Pokemons[] = [];
  selectedPokemon: Pokemon | null = null;
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 20;
  searchTerm = '';
  isLoading = false;
  error: string | null = null;
  private _subscription = new Subscription();

  constructor(private _pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.isLoading = true;
    this.error = null;

    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this._subscription.add(
      this._pokemonService
        .getPokemons(offset, this.itemsPerPage, this.searchTerm)
        .subscribe({
          next: (data) => {
            this.pokemons = data.results;
            this.totalPages = Math.ceil(data.count / this.itemsPerPage);
            this.isLoading = false;
          },
          error: (error) => {
            this.error =
              'Impossible de charger les Pokémons. Veuillez réessayer.';
            console.error('Erreur:', error);
            this.isLoading = false;
          },
        })
    );
  }

  onSelectPokemon(pokemon: Pokemons): void {
    const id = this.getIdFromUrl(pokemon.url);
    this._subscription.add(
      this._pokemonService.getPokemonById(Number(id)).subscribe({
        next: (pokemon) => (this.selectedPokemon = pokemon),
        error: (error) => console.error('Erreur:', error),
      })
    );
  }

  getIdFromUrl(url: string): string {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : '1';
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPokemons();
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
    this.loadPokemons();
  }

  onClosePokemonDetail(): void {
    this.selectedPokemon = null;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
