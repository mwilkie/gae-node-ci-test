export const NOTIFICATION_CLEAR = 'NOTIFICATIONS/CLEAR_NOTIFICATION';
export const NOTIFICATION_SHOW = 'NOTIFICATIONS/SHOW_NOTIFICATION';

export function clearNotification(id) {
  return {
    type: NOTIFICATION_CLEAR,
    data: { id }
  };
}

export function showNotification(data) {
  return {
    type: NOTIFICATION_SHOW,
    data
  };
}
