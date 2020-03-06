export function getChatId(userId, targetID) {
  return [userId, targetID].sort().join('_');
}
