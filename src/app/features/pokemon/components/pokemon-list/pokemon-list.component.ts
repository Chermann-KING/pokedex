import { Component, Input } from '@angular/core';
import { Pokemons } from '../../../../core/models/pokemons.model';

@Component({
  selector: 'app-pokemon-list',
  standalone: false,

  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  @Input() pokemons: Pokemons[] = [];

  getIdFromUrl(url: string): string {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : '1';
  }

  getPokemonImage(id: string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  onSelectPokemon(pokemon: Pokemons): void {
    const id = this.getIdFromUrl(pokemon.url);
    // TODO: Implémenter la sélection du Pokémon
  }
}
