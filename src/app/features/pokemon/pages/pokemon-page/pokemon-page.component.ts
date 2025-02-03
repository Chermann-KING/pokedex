import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { Pokemons } from '../../../../core/models/pokemons.model';

@Component({
  selector: 'app-pokemon-page',
  standalone: false,

  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.scss',
})
export class PokemonPageComponent {
  pokemons: Pokemons[] = [];
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 20;
  searchTerm = '';

  constructor(private _pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
    this._pokemonService.subscribe((pokemons) => {
      this.pokemons = pokemons;
    });
  }

  async loadPokemons(): Promise<void> {
    try {
      const offset = (this.currentPage - 1) * this.itemsPerPage;
      const data = await this._pokemonService.getPokemons(
        offset,
        this.itemsPerPage
      );
      this.totalPages = Math.ceil(data.count / this.itemsPerPage);
    } catch (error) {
      console.error('Erreur lors du chargement des Pokémons:', error);
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPokemons();
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this._pokemonService.searchPokemons(term);
  }
}
