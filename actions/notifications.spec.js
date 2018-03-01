import {
  clearNotification,
  showNotification,
  NOTIFICATION_CLEAR,
  NOTIFICATION_SHOW
} from './notifications';

describe('notification actions', () => {
  describe('clearNotification', () => {
    it('should dispatch NOTIFICATION_CLEAR', () => {
      const actual = clearNotification(1);
      const expected = {
        type: NOTIFICATION_CLEAR,
        data: { id: 1 }
      };
      expect(actual).toEqual(expected);
    });
  });

  describe('showNotification', () => {
    it('should dispatch NOTIFICATION_SHOW with the correct data', () => {
      const data = {
        content: 'content'
      };
      const actual = showNotification(data);
      const expected = {
        type: NOTIFICATION_SHOW,
        data
      };
      expect(actual).toEqual(expected);
    });
  });
});
