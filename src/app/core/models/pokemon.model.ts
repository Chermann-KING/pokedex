/**
 * Représente un Pokémon avec ses caractéristiques détaillées.
 * Cette interface est conçue pour correspondre à la structure de données de l'API PokéAPI.
 *
 * @interface Pokemon
 *
 * @property {number} id - Identifiant unique du Pokémon
 *
 * @property {string} name - Nom du Pokémon
 *
 * @property {object} sprites - Contient les différentes représentations visuelles du Pokémon
 * @property {string} sprites.front_default - URL de l'image par défaut de face du Pokémon
 * @property {object} [sprites.other] - Contient d'autres variantes d'images (optionnel)
 * @property {object} [sprites.other.official-artwork] - Contient l'artwork officiel (optionnel)
 * @property {string} [sprites.other.official-artwork.front_default] - URL de l'artwork officiel de face
 *
 * @property {number} height - Taille du Pokémon (en décimètres)
 *
 * @property {number} weight - Poids du Pokémon (en hectogrammes)
 *
 * @property {object[]} types - Liste des types du Pokémon
 * @property {number} types[].slot - Position du type dans la liste (1 pour type principal, 2 pour type secondaire)
 * @property {object} types[].type - Informations sur le type
 * @property {string} types[].type.name - Nom du type (ex: "feu", "eau")
 * @property {string} types[].type.url - URL de l'endpoint API pour plus d'informations sur ce type
 *
 * @property {object[]} abilities - Liste des capacités du Pokémon
 * @property {object} abilities[].ability - Informations sur la capacité
 * @property {string} abilities[].ability.name - Nom de la capacité
 * @property {string} abilities[].ability.url - URL de l'endpoint API pour plus d'informations sur cette capacité
 * @property {boolean} abilities[].is_hidden - Indique si c'est une capacité cachée
 * @property {number} abilities[].slot - Position de la capacité dans la liste
 *
 * @property {object[]} stats - Liste des statistiques de base du Pokémon
 * @property {number} stats[].base_stat - Valeur de base de la statistique
 * @property {number} stats[].effort - Points d'effort (EV) gagnés en battant ce Pokémon
 * @property {object} stats[].stat - Informations sur la statistique
 * @property {string} stats[].stat.name - Nom de la statistique (ex: "hp", "attack")
 * @property {string} stats[].stat.url - URL de l'endpoint API pour plus d'informations sur cette statistique
 *
 * @example
 * // Exemple d'utilisation de l'interface Pokemon
 * const pikachu: Pokemon = {
 *   id: 25,
 *   name: "pikachu",
 *   sprites: {
 *     front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
 *     other: {
 *       'official-artwork': {
 *         front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
 *       }
 *     }
 *   },
 *   height: 4,
 *   weight: 60,
 *   types: [
 *     {
 *       slot: 1,
 *       type: {
 *         name: "electric",
 *         url: "https://pokeapi.co/api/v2/type/13/"
 *       }
 *     }
 *   ],
 *   abilities: [
 *     {
 *       ability: {
 *         name: "static",
 *         url: "https://pokeapi.co/api/v2/ability/9/"
 *       },
 *       is_hidden: false,
 *       slot: 1
 *     }
 *   ],
 *   stats: [
 *     {
 *       base_stat: 35,
 *       effort: 0,
 *       stat: {
 *         name: "hp",
 *         url: "https://pokeapi.co/api/v2/stat/1/"
 *       }
 *     }
 *   ]
 * };
 */
export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other?: {
      'official-artwork'?: {
        front_default: string;
      };
    };
  };
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  mainType?: string;
  image?: string;
}
