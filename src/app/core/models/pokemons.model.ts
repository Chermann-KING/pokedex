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
 * @property {object[]} [types] - Liste des types du Pokémon (optionnel)
 * @property {number} types[].slot - Position du type dans la liste (1 pour type principal, 2 pour type secondaire)
 * @property {object} types[].type - Information sur le type
 * @property {string} types[].type.name - Nom du type (ex: "feu", "eau")
 * @property {string} types[].type.url - URL de l'endpoint API pour plus d'informations sur ce type
 * @property {string} [mainType] - Type principal du Pokémon (optionnel), dérivé du premier type de la liste
 *
 * @example
 * // Exemple d'utilisation dans un tableau de Pokemons
 * const pokemons: Pokemons[] = [
 *   {
 *     name: "bulbasaur",
 *     url: "https://pokeapi.co/api/v2/pokemon/1/",
 *     types: [
 *       {
 *         slot: 1,
 *         type: {
 *           name: "grass",
 *           url: "https://pokeapi.co/api/v2/type/12/"
 *         }
 *       },
 *       {
 *         slot: 2,
 *         type: {
 *           name: "poison",
 *           url: "https://pokeapi.co/api/v2/type/4/"
 *         }
 *       }
 *     ],
 *     mainType: "grass"
 *   }
 * ];
 *
 * @see PokemonComponent.getIdFromUrl() - Méthode pour extraire l'ID depuis l'URL
 * @see PokemonComponent.onSearch() - Méthode utilisant la propriété name pour le filtrage
 */
export interface Pokemons {
  name: string;
  url: string;
  types?: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  mainType?: string;
}
