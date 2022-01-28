import validator from 'validator';

export function validateLoginForm(
  { email, password }: { email: string; password: string },
  setError: (error: string) => void
): boolean {
  if (!email || !password || !validator.isEmail(email) || !validator.isAlphanumeric(password)) {
    setError('Please enter a valid Wanderlist ID.');

    return false;
  }

  return true;
}

export function validateRegisterForm(name: string, setError: (error: string) => void): boolean {
  if (!name || !validator.isAlphanumeric(name)) {
    setError('Please enter a valid trip name.');

    return false;
  }

  return true;
}
