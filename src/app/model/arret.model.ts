export interface Arret {
    _id: string;
    order: number;
    idCircuit : string,
    title: string;
    description: string;
    imagePath: string;
    audioPath: string;
    mapContent: {
      lat: number;
      lng: number;
    };
    specificDestinations : string[]
}