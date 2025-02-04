import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../../../core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  standalone: false,

  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent {
  @Input() pokemon: Pokemon | null = null;
  @Output() close = new EventEmitter<void>();

  activeTab: 'taille' | 'poids' = 'taille';

  getTypeIcon(typeName: string): string {
    return `/images/pokemon-types/${typeName}.svg`;
  }

  getStatName(statName: string): string {
    const statNames: { [key: string]: string } = {
      hp: 'Hp',
      attack: 'Attack',
      defense: 'Defense',
      'special-attack': 'Special-attack',
      'special-defense': 'Special-defense',
      speed: 'Speed',
    };
    return statNames[statName] || statName;
  }

  onClose(): void {
    this.close.emit();
  }
}
