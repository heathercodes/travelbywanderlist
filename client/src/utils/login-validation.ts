import validator from 'validator';

export function validateLoginForm(
    collectionId: string,
    setError: (error: string | null) => void
): boolean {
    if (!collectionId || !validator.isNumeric(collectionId)) {
        setError('Please enter a valid Wanderlist ID.');

        return false;
    }

    return true;
}

export function validateRegisterForm(
    name: string,
    setError: (error: string | null) => void
): boolean {
    if (!name || !validator.isAlphanumeric(name)) {
        setError('Please enter a valid trip name.');

        return false;
    }

    return true;
}
