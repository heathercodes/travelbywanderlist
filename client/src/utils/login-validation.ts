import validator from 'validator';

export function validateLoginForm(
    collectionId: string,
    setError: (error: string | null) => void,
): boolean {
    // Check for undefined or empty input fields
    if (!collectionId) {
      setError('Please enter a valid Wanderlist ID.');

      return false;
    }

    // Validate email
    if (!validator.isNumeric(collectionId)) {
      setError('Please enter a valid Wanderlist ID.');

      return false;
    }

    return true;
}
