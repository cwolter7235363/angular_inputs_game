import { Gender } from "./app/animal-form/animal-form.component";

export type Animal = Attributes & {
    name: string;
    image_url: string;
}

type SpeciesInfo = {
name: string;
species: string;
description: string;
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