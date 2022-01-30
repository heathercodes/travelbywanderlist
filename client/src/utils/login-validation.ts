import validator from 'validator';

export function validateLoginForm(
  { email, password }: { email: string; password: string },
  setError: (error: string) => void
): boolean {
  if (!email || !password || !validator.isEmail(email) || !validator.isAlphanumeric(password)) {
    setError('Invalid email or password');

    return false;
  }

  return true;
}
