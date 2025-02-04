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

  readonly typeColors: { [key: string]: string } = {
    grass: '#78c850',
    fire: '#f08030',
    water: '#6890f0',
    bug: '#a8b820',
    normal: '#a8a878',
    electric: '#f8d030',
    ground: '#e0c068',
    fairy: '#ee99ac',
    fighting: '#c03028',
    psychic: '#f85888',
    rock: '#b8a038',
    steel: '#b8b8d0',
    ice: '#98d8d8',
    ghost: '#705898',
    dragon: '#7038f8',
    dark: '#705848',
    poison: '#a040a0',
    flying: '#a890f0',
  };

  getIdFromUrl(url: string): string {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : '1';
  }

  getPokemonImage(id: string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  onSelectPokemon(pokemon: Pokemons): void {
    this.selectPokemon.emit(pokemon);
  }
}
