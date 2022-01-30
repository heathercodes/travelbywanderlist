import { Request } from 'express';

export interface KnexResponse {
    rows: any[];
}

export interface Location {
    id: number;
    wanderlist_id: number;
    name: string;
    latitude: number;
    longitude: number;
    image_url?: string;
    description?: string;
}

export interface Collection {
    id: number;
    user_id?: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Wanderlist {
    collection: Collection;
    locations?: Location[];
}

export interface UpdateLocationReq {
    id: number;
    wanderlist_id: number;
    name?: string;
    latitude?: number;
    longitude?: number;
    description?: string;
    image_url?: string;
}

export interface LocationRequest extends Request {
    body: {
        name: string;
        latitude: number;
        longitude: number;
        description?: string;
        image_url?: string;
        wanderlist_id: number;
    };
}

export interface CollectionRequest extends Request {
    body: {
        collection: {
            id: number;
            name: string;
        };
        locations: {
            id: number;
            name: string;
            latitude: number;
            longitude: number;
            description?: string;
            image_url?: string;
            wanderlist_id: number;
        }[];
    };
}

export interface CollectionUpdateReq {
    collection: {
        id: number;
        name: string;
    };
    locations?: {
        id: number;
        name: string;
        latitude: number;
        longitude: number;
        description?: string;
        image_url?: string;
        wanderlist_id: number;
    }[];
}

export interface CollectionUpdate {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    wanderlists?: Wanderlist[];
}

export interface UserRequest extends Request {
    body: {
        id: number;
        name: string;
        email: string;
        password: string;
        wanderlists: Wanderlist[];
    };
}
