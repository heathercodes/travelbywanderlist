import { KnexResponse, User } from '../models';
import { db } from '../db';

export async function createUser({
    email,
    password
}: {
    email: string;
    password: string;
}): Promise<any> {
    const results: KnexResponse = await db.raw(
        'insert into "users" ("email", "password") values (?, ?) returning *',
        [email, password]
    );

    return results.rows[0];
}

export async function getUser(data: { email: string }): Promise<any> {
    const results: KnexResponse = await db.raw('select * from "users" where "email" = ?', [
        data.email
    ]);

    return results.rows[0];
}

export async function updateUser(data: { id: number }): Promise<User> {
    const results: KnexResponse = await db.raw('update "users" where "id" = ? returning *', [
        data.id
    ]);

    return results.rows[0];
}

export async function deleteUserById(data: { id: number }): Promise<number> {
    const result = await db.raw('delete from "user" where "id" = ? returning "id"', [data.id]);

    if (!result.rows[0]) {
        return 0;
    }

    return data.id;
}
