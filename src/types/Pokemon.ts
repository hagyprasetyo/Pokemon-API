export interface Pokemon {
    name: string;
    url: string;
  }
  
  export interface PokemonDetail {
    name: string;
    sprites: {
      front_default: string;
    };
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
  }