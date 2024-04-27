import { Attributes } from "../../types";
import { Gender } from "../animal-form/animal-form.component";

function  getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
export function combineInputsAndAddNew(animal1: Attributes, animal2: Attributes, ) {
    if (animal1.physical.gender === animal2.physical.gender)
    {
      alert('Cannot combine two animals of the same gender');
      return;
    }


    if (!animal1 || !animal2) {
      console.error('One or both inputs are missing');
      return;
    }
  
    // Combine physical attributes
    const combinedPhysical = {
      gender: Gender.MALE, // Placeholder, you might want to handle this differently
      size: getRandomElement(["small", "medium", "large"]), // Example strategy
      weight: getRandomElement(["light", "heavy", "muscular"]), // Example strategy
      bodyStructure: getRandomElement(["slim", "bulky"]), // Example strategy
    };
  
    // Combine combat skills
    const combinedCombatSkills = {
      attackPower: Math.round((animal1.combatSkills.attackPower + animal2.combatSkills.attackPower) / 2),
      defense: Math.round((animal1.combatSkills.defense + animal2.combatSkills.defense) / 2),
      speed: getRandomElement(["slow", "average", "fast"]), // Ensure this matches AttributeShape
      agility: getRandomElement(["low", "moderate", "high"]), // Ensure this matches AttributeShape
      stamina: Math.round((animal1.combatSkills.stamina + animal2.combatSkills.stamina) / 2),
    };
  
    // Combine elemental attributes
    const combinedElemental = {
      elementalAffinities: Array.from(new Set([...animal1.elemental.elementalAffinities, ...animal2.elemental.elementalAffinities])),
      elementalAttacks: animal1.elemental.elementalAttacks || animal2.elemental.elementalAttacks,
    };
  
    // Combine special abilities
    const combinedSpecialAbilities = {
      uniqueSkills: Array.from(new Set([...animal1.specialAbilities.uniqueSkills, ...animal2.specialAbilities.uniqueSkills])),
      passiveTraits: Array.from(new Set([...animal1.specialAbilities.passiveTraits, ...animal2.specialAbilities.passiveTraits])),
    };
  
    // Combine breeding attributes
    const combinedBreeding = {
      geneticTraits: Array.from(new Set([...animal1.breeding.geneticTraits, ...animal2.breeding.geneticTraits])),
      mutationChance: Math.round((animal1.breeding.mutationChance + animal2.breeding.mutationChance) / 2),
      breedingCooldown: Math.round((animal1.breeding.breedingCooldown + animal2.breeding.breedingCooldown) / 2),
    };
  
    // Combine appearance (randomly select from either animal)
    const combinedAppearance = {
      coloration: getRandomElement([animal1.appearance.coloration, animal2.appearance.coloration]),
      hornsOrSpikes: getRandomElement([animal1.appearance.hornsOrSpikes, animal2.appearance.hornsOrSpikes]),
      skinTexture: getRandomElement([animal1.appearance.skinTexture, animal2.appearance.skinTexture]),
    };
  
    // Combine behavioral attributes
    const combinedBehavioral = {
      temperament: getRandomElement([animal1.behavioral.temperament, animal2.behavioral.temperament]),
      habitatPreference: Array.from(new Set([...animal1.behavioral.habitatPreference, ...animal2.behavioral.habitatPreference])),
    };
  
    // Combine rarity and class (simplified strategy)
    const combinedRarityAndClass = {
      rarity: getRandomElement([animal1.rarityAndClass.rarity, animal2.rarityAndClass.rarity]), // Example strategy
      class: getRandomElement([animal1.rarityAndClass.class, animal2.rarityAndClass.class]), // Example strategy
    };
  
    // Combine breeding mechanics
    const combinedBreedingMechanics = {
      compatibility: Array.from(new Set([...animal1.breedingMechanics.compatibility, ...animal2.breedingMechanics.compatibility])),
      offspringTraits: Array.from(new Set([...animal1.breedingMechanics.offspringTraits, ...animal2.breedingMechanics.offspringTraits])),
      breedingBonuses: Array.from(new Set([...animal1.breedingMechanics.breedingBonuses, ...animal2.breedingMechanics.breedingBonuses])),
    };
  
    // Create a new input with the combined values
    const combinedAttributes: Attributes = {
        // @ts-ignore
        physical: combinedPhysical,
        // @ts-ignore
        combatSkills: combinedCombatSkills,
        elemental: combinedElemental,
        specialAbilities: combinedSpecialAbilities,
        breeding: combinedBreeding,
        appearance: combinedAppearance,
        behavioral: combinedBehavioral,
        rarityAndClass: combinedRarityAndClass,
        breedingMechanics: combinedBreedingMechanics,
        species: {
            name: "",
            species: "",
            description: "",
            image_url: ""
        }
    };
  
    // Add the new input to the form
    return combinedAttributes;
  }