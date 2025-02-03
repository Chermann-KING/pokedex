import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonPageComponent } from './pages/pokemon-page/pokemon-page.component';
import { SharedModule } from '../../shared/shared.module';
import { PokemonRoutingModule } from './pokemon.routing.module';

@NgModule({
  declarations: [PokemonPageComponent],
  imports: [CommonModule, FormsModule, SharedModule, PokemonRoutingModule],
})
export class PokemonModule {}
