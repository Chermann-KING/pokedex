import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../../core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  standalone: false,

  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent {
  @Input() pokemon: Pokemon | null = null;
}
