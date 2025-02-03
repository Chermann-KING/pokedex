import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemons } from '../../../../core/models/pokemons.model';

@Component({
  selector: 'app-pokemon-list',
  standalone: false,

  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  @Input() pokemons: Pokemons[] = [];
  @Output() selectPokemon = new EventEmitter<Pokemons>();

  getIdFromUrl(url: string): string {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : '1';
  }

  getPokemonImage(id: string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  onSelectPokemon(pokemon: Pokemons): void {
    this.selectPokemon.emit(pokemon);
  }
}
