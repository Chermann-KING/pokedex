import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonPageComponent } from './pages/pokemon-page/pokemon-page.component';
import { SharedModule } from '../../shared/shared.module';
import { PokemonRoutingModule } from './pokemon.routing.module';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

@NgModule({
  declarations: [PokemonPageComponent, PokemonListComponent],
  imports: [CommonModule, FormsModule, SharedModule, PokemonRoutingModule],
})
export class PokemonModule {}
