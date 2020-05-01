export interface Location {
    id: number;
    wanderlist_id: number;
    name: string;
    latitude: number;
    longitude: number;
    image_url?: string;
    description?: number;
}

export interface Collection {
    id: number;
    user_id?: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    locations?: Location[];
}
