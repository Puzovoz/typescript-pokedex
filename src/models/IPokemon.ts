export interface IPokemon {
  abilities: IAbility[];
  base_experience: number;
  forms: ILink[];
  game_indices: {
    game_index: number;
    version: ILink;
  }[]
  height: number;
  held_items?: IHeldItem[]
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: IMove[];
  order: number;
  species: ILink;
  sprites: ISprite;
  stats: IStat[];
  types: IType[];
}

export interface ILink {
  name: string;
  url: string;
}

export interface IAbility {
  ability: ILink;
  is_hidden: boolean;
  slot: number;
}

export interface IHeldItem {
  item: ILink;
  version_details: {
    rarity: number;
    version: ILink;
  }
}

export interface IMove {
  move: ILink;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: ILink;
    version_group: ILink;
  }[]
}

export interface ISprite {
  back_default: string;
  back_female?: string;
  back_shiny: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny: string;
  front_shiny_female?: string
}

export interface IStat {
  base_stat: number;
  effort: number;
  stat: ILink;
}

export interface IType {
  slot: number;
  type: ILink;
}

export interface PokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: ILink[];
}
