import { StrengthAttributeValues, RemarkabilityAttributeValues, MutationChanceAttributeValues, TrageZeitAttributeValue, YieldBonusAttributeValues } from "../AttributeConfig";
import { AttributeDataMapping, StrengthAttributeWerte, Remarkability, MutationChance, TrageZeitAttributeWerte, YieldBonus, DnDMonster } from "../../types";
import { v4 as uuidv4 } from 'uuid';
import { randSuperheroName } from '@ngneat/falso';
import MonsterData from "../resources/monsters.json";
import { Gender } from "../animal-form/animal-form.component";


// Corrected helper function to randomly select an attribute value based on chance
function selectAttributeValue<T extends string | number | symbol>(attributeValues: AttributeDataMapping<T>): { bonus: number; chance: number; value?: number } | null {
        // @ts-ignore
    const totalChance = Object.values(attributeValues).reduce((acc, { chance }) => acc + chance, 0);
    // @ts-ignore
    let randomChance = Math.random() * totalChance;
    for (const key of Object.keys(attributeValues)) {
        // @ts-ignore
      const attribute = attributeValues[key];
      if (randomChance < attribute.chance) return attribute;
      randomChance -= attribute.chance;
    } 
    return null;
}

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

// Function to generate a new monster
function generateNewMonster(): DnDMonster {
    return {
        uuid: uuidv4(),
        name: randSuperheroName(),
        birthTimestamp: new Date(),
        species: getRandomElement(MonsterData),
        // @ts-ignore
        strength: selectAttributeValue(StrengthAttributeValues),
          // @ts-ignore
        remarkability: selectAttributeValue(RemarkabilityAttributeValues),
          // @ts-ignore
        mutationChance: selectAttributeValue(MutationChanceAttributeValues),
          // @ts-ignore
        gestationPeriod: selectAttributeValue(TrageZeitAttributeValue),
          // @ts-ignore
        yieldBonus: selectAttributeValue(YieldBonusAttributeValues),
                  // @ts-ignore
        gender: Gender[Math.floor(Math.random() * 2) as 0 | 1]
    };
}

export default generateNewMonster;