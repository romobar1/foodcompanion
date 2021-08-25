import { Receta } from 'src/app/interfaces/receta';
export interface Recetario{
    id: number;
    title: string;
    description: string;
    recetas: Receta[];
}