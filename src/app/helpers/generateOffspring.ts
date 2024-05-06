import { randSuperheroName } from '@ngneat/falso';
import { v4 as uuidv4 } from 'uuid';
import { MutationChanceAttributeValues } from "../AttributeConfig";
import { DnDMonster, EvolutionStage, Gender } from '../../types';
import { AttributeValueWithOptionalValue } from '../../types';


export function genOffspring(animal1: DnDMonster, animal2: DnDMonster ) : DnDMonster{
    const child = {
        uuid: uuidv4(),
        name: randSuperheroName(),

        birthTimestamp: new Date(),
        species: getRandomElement([animal1, animal2]).species,
        // @ts-ignore
        strength: getRandomElement([animal1, animal2]).strength,
          // @ts-ignore
        remarkability: getRandomElement([animal1, animal2]).remarkability,
          // @ts-ignore
        mutationChance: getRandomElement([animal1, animal2]).mutationChance,
          // @ts-ignore
        gestationPeriod: getRandomElement([animal1, animal2]).gestationPeriod,
          // @ts-ignore
        yieldBonus: getRandomElement([animal1, animal2]).yieldBonus,
        // @ts-ignore
        gender: Gender[Math.floor(Math.random() * 2) as 0 | 1] as Gender,
        progressTowardsNextEvolution: 0,
          // @ts-ignore
        evolutionStage: 'baby' as EvolutionStage, 
        enclosureCost: getRandomElement([animal1, animal2]).enclosureCost,
        baseSalePrice: getRandomElement([animal1, animal2]).baseSalePrice,
    } as DnDMonster;
    child.gestationPeriod = (child.gender === animal1.gender ? animal1.gestationPeriod : animal2.gestationPeriod);
    if((Math.random() < child.mutationChance.bonus)){
       //get random attribute, increase by one if possible
    }
    const test = getNextAttribute(MutationChanceAttributeValues, child.mutationChance);
    return child;
}

function getRandomElement<T>(items: T[]): T {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

function getNextAttribute(enumObj: any, currentValue: AttributeValueWithOptionalValue): AttributeValueWithOptionalValue {
    const values = Object.keys(enumObj).map(key => enumObj[key]);
    const currentIndex = values.indexOf(currentValue);
    // Return the next value, or the same if it's the last one
    return currentIndex < values.length - 1 ? values[currentIndex + 1] : currentValue;
}

function getRandomProperty<T extends object>(obj: T): [string, any] {
    const keys = Object.keys(obj);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    // Note: Using any here because we don't know the type of values at compile time
    return [randomKey, obj[randomKey as keyof T]];
}