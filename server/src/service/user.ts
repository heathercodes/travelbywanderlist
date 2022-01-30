import { User } from '../models';
import * as userRepo from '../repositories/user';
import * as collectionRepo from '../repositories/collection';
import bcrypt from 'bcrypt';

export async function createUser({
    email,
    password
}: {
    email: string;
    password: string;
}): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepo.createUser({ email, password: hashedPassword });

    if (!user) {
        return Promise.reject(new Error('createUser error'));
    }

    return user;
}

export async function getUser(data: { email: string }): Promise<User> {
    const user = await userRepo.getUser(data);
    const wanderlists = await collectionRepo.getCollectionByUserId({ id: user.id });

    if (!user) {
        return Promise.reject(new Error('getUser error: user not found'));
    }

    return { ...user, wanderlists };
}

export async function updateUser(data: User): Promise<User> {
    const user = await userRepo.updateUser(data);

    if (!user) {
        return Promise.reject(new Error('updateUser error'));
    }

    return user;
}

export async function deleteUserById(data: { id: number }): Promise<number> {
    const id = await userRepo.deleteUserById(data);

    if (!id) {
        return Promise.reject(new Error('deleteUserById error'));
    }

    return id;
}
