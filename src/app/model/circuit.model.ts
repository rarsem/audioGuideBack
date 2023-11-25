export interface Circuit {
    _id: string;
    city: string;
    country: string;
    title: string;
    description: string;
    languages: any[];
    distance: number;
    duration: string;
    imagePath: string;
    mapContent: {
      lat: number;
      lng: number;
    };
    showPolyline : boolean
}