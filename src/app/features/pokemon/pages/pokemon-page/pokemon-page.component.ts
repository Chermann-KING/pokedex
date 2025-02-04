import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { Pokemons } from '../../../../core/models/pokemons.model';
import { Pokemon } from '../../../../core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-page',
  standalone: false,

  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.scss',
})
export class PokemonPageComponent implements OnInit {
  pokemons: Pokemons[] = [];
  selectedPokemon: Pokemon | null = null;
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 20;
  searchTerm = '';

  constructor(private _pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  async loadPokemons(): Promise<void> {
    try {
      const offset = (this.currentPage - 1) * this.itemsPerPage;
      const data = await this._pokemonService.getPokemons(
        offset,
        this.itemsPerPage,
        this.searchTerm
      );
      this.pokemons = data.results;
      this.totalPages = Math.ceil(data.count / this.itemsPerPage);
    } catch (error) {
      console.error('Erreur lors du chargement des Pokémons:', error);
    }
  }

  async onSelectPokemon(pokemon: Pokemons): Promise<void> {
    try {
      const id = this.getIdFromUrl(pokemon.url);
      this.selectedPokemon = await this._pokemonService.getPokemonById(
        Number(id)
      );
    } catch (error) {
      console.error('Erreur lors du chargement des détails du Pokémon:', error);
    }
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
}
