/**
 * Représente un élément de la liste des Pokémons.
 * Cette interface est utilisée pour typer chaque entrée du tableau de Pokémons
 * dans le composant d'affichage de la liste.
 *
 * @interface Pokemons
 *
 * @property {string} name - Nom du Pokémon en minuscules, utilisé pour l'affichage et la recherche
 * @property {string} url - URL de l'endpoint API contenant l'ID du Pokémon
 *                         Format: "https://pokeapi.co/api/v2/pokemon/{id}/"
 *                         L'ID peut être extrait via la méthode getIdFromUrl()
 *
 * @example
 * // Exemple d'utilisation dans un tableau de Pokemons
 * const pokemons: Pokemons[] = [
 *   {
 *     name: "bulbasaur",
 *     url: "https://pokeapi.co/api/v2/pokemon/1/"
 *   },
 *   {
 *     name: "charmander",
 *     url: "https://pokeapi.co/api/v2/pokemon/4/"
 *   }
 * ];
 *
 * @see PokemonComponent.getIdFromUrl() - Méthode pour extraire l'ID depuis l'URL
 * @see PokemonComponent.onSearch() - Méthode utilisant la propriété name pour le filtrage
 */
export interface Pokemons {
  name: string;
  url: string;
}
