
//id for user(founder/investor)
export const generateUserId = (role) => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${role}_${random}`;
};
