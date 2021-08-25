export interface Receta{
    id: number;
    title: string;
    description: string;
    numComensales: number;
    dificultad : number;
    tags: String[];
    ingredientes: string;
    body: string;
    rate: number;
    tiempo: number;
    type: string;
    imageURl: string;
}