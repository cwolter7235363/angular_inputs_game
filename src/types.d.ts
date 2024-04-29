import { Gender } from "./app/animal-form/animal-form.component";

export type Animal = DnDMonster | FarmMonster;

type SpeciesInfo = {
name: string;
species: string;
cycleTime: number;
description: string;
homePlanet: string;
image_url: string;
}

type AttributeShape = "small" | "medium" | "large" | "light" | "heavy" | "muscular" | "slim" | "bulky" | "slow" | "average" | "fast" | "low" | "moderate" | "high";
type CombatSkillShape = "positive integer";
type ElementalShape = "fire" | "water" | "thunder" | "ice" | "earth";
type SpecialAbilityShape = "skill1" | "skill2" | "skill3" | "trait1" | "trait2" | "trait3";
type BreedingShape = "percentage (0-100)" | "positive integer (seconds)";
type AppearanceShape = "color name";
type BehavioralShape = "aggressive" | "docile" | "territorial";
type RarityAndClassShape = "common" | "rare" | "legendary" | "elite" | "boss";
type BreedingMechanicsShape = "speciesA" | "speciesB" | "bonus1" | "bonus2";

interface Attributes {
  species: SpeciesInfo;
  physical: {
    gender: Gender;
    size: AttributeShape;
    weight: AttributeShape;
    bodyStructure: AttributeShape;
  };
  combatSkills: {
    attackPower: number; // Assuming positive integer
    defense: number; // Assuming positive integer
    speed: AttributeShape;
    agility: AttributeShape;
    stamina: number; // Assuming positive integer
  };
  elemental: {
    elementalAffinities: ElementalShape[];
    elementalAttacks: boolean;
  };
  specialAbilities: {
    uniqueSkills: SpecialAbilityShape[];
    passiveTraits: SpecialAbilityShape[];
  };
  breeding: {
    geneticTraits: SpecialAbilityShape[];
    mutationChance: number; // Assuming percentage (0-100)
    breedingCooldown: number; // Assuming positive integer (seconds)
  };
  appearance: {
    coloration: string; // Assuming color name
    hornsOrSpikes: string;
    skinTexture: string;
  };
  behavioral: {
    temperament: BehavioralShape;
    habitatPreference: ElementalShape[]; // Assuming habitat types match elemental affinities
  };
  rarityAndClass: {
    rarity: RarityAndClassShape;
    class: RarityAndClassShape;
  };
  breedingMechanics: {
    compatibility: BreedingMechanicsShape[];
    offspringTraits: SpecialAbilityShape[];
    breedingBonuses: BreedingMechanicsShape[];
  };
}

interface ErrorMessages {
  [key: string]: string;
}


export type BreedingPod = {
  uuid: string;
  parents: Animal[];
  offspring: Animal[];
  errorMessage?: string
  timeToHatch: number;
  timeRemaining?: number;
  countDown?: number;
  breedingStartDateTime: Date;
}

export enum EvolutionStage {
  baby,
  teen,
  adult
}

export type DnDMonster = {
  uuid: string;
  name: string;
  gender: Gender;
  image: string;
  birthTimestamp: Date;
  species: SpeciesInfo;
  evolutionStage: EvolutionStage;
  enclosureCost: number;
  baseSalePrice: number;
  strength: AttributeValueWithOptionalValue; // Directly use the interface here
  remarkability: AttributeValueWithOptionalValue;
  mutationChance: AttributeValueWithOptionalValue;
  gestationPeriod: AttributeValueWithOptionalValue;
  yieldBonus: AttributeValueWithOptionalValue;
}

export type FarmMonster = DnDMonster & {
  baseYield: number;
  count: number;
}

export interface Attribute<T> {
  bezeichnung: string;
}

export enum StrengthAttributeWerte {
    Gigantisch = "Gigantisch!",
    Ausgezeichnet = "Ausgezeichnet",
    Stark = "Stark",
    Robust = "Robust",
    Normal = "Normal",
    Schwach = "Schwach"
}

export enum TrageZeitAttributeWerte {
    WurfMaschine = "Wurf Maschine!",
    Zügig = "Zügig",
    Mittel = "Mittel",
    Lang = "Lang",
    SehrLang = "Sehr Lang",
    ExtremLang = "Extrem Lang"
}

export enum Remarkability {
  Bemerkenswert = "Bemerkenswert",
  Beeindruckend = "Beeindruckend",
  Attraktiv = "Attraktiv",
  Durchschnittlich = "Durchschnittlich",
  GehtSo = "Geht So",
  Hässlich = "Hässlich"
}

export enum MutationChance {
  SehrHoch = "Sehr hoch",
  Hoch = "Hoch",
  Erhöht = "Erhöht",
  Durchschnittlich = "Durchschnittlich",
  Gering = "Gering",
  Niedrig = "Niedrig"
}

export enum YieldBonus {
  Unerreicht = "Unerreicht!",
  Üppig = "Üppig",
  Ergiebig = "Ergiebig",
  Akzeptabel = "Akzeptabel",
  Bescheiden = "Bescheiden",
  Spärlich = "Spärlich"
}

interface AttributeValueBase {
  bonus: number;
  chance: number;
  enumValue: string | number | symbol;
}

// Extend the base for cases where 'value' is also present
interface AttributeValueWithOptionalValue extends AttributeValueBase {
  value?: number;
}
// Use a generic mapped type for flexibility
type AttributeDataMapping<T extends string | number | symbol> = {
  [K in T]: AttributeValueWithOptionalValue;
};


interface Attribute<T> {
  value: T;
}
