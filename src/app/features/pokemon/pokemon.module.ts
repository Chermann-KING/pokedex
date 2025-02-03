import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonPageComponent } from './pages/pokemon-page/pokemon-page.component';
import { SharedModule } from '../../shared/shared.module';
import { PokemonRoutingModule } from './pokemon.routing.module';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';

@NgModule({
  declarations: [PokemonPageComponent, PokemonListComponent, PokemonDetailComponent],
  imports: [CommonModule, FormsModule, SharedModule, PokemonRoutingModule],
})
export class PokemonModule {}
