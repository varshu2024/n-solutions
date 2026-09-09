export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateRegistrationInput = ({ name, email, password }) => {
  const errors = {};

  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    errors.name = 'Name must be between 2 and 100 characters.';
  }
  if (typeof email !== 'string' || !isValidEmail(email.trim())) {
    errors.email = 'A valid email is required.';
  }
  if (
    typeof password !== 'string'
    || password.length < 8
    || password.length > 72
    || !/[A-Za-z]/.test(password)
    || !/\d/.test(password)
  ) {
    errors.password = 'Password must be 8-72 characters and include at least one letter and one number.';
  }

  return errors;
};

export const validateLoginInput = ({ email, password }) => {
  const errors = {};
  if (typeof email !== 'string' || !isValidEmail(email.trim())) errors.email = 'A valid email is required.';
  if (typeof password !== 'string' || password.length === 0) errors.password = 'Password is required.';
  return errors;
};

export const parseLimit = (value, defaultLimit, maxLimit) => {
  if (value === undefined) return defaultLimit;
  const limit = Number.parseInt(value, 10);
  if (!Number.isInteger(limit) || limit < 1) return defaultLimit;
  return Math.min(limit, maxLimit);
};
