export function mapUser(user) {
  if (!user) return null;
  return {
    ...user,
    firstName: user.first_name,
    lastName: user.last_name,
  };
}