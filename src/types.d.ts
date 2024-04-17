import { Gender } from "./app/animal-form/animal-form.component";

export interface Animal {
    gender?: Gender,
    height?: number, 
    weight?: number, 
    name?: string
}