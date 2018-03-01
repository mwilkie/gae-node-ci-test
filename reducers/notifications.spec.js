import notification from './notifications';
import {
  NOTIFICATION_CLEAR,
  NOTIFICATION_SHOW
} from '../actions/notifications';

describe('notification reducer', () => {
  describe('DEFAULT', () => {
    it('should return the default notification state', () => {
      const actual = notification(undefined, {});
      const expected = [];
      expect(actual).toEqual(expected);
    });
  });

  describe('NOTIFICATION_CLEAR', () => {
    it('should remove the notification to the list of notifications', () => {
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const actual = notification(data, {
        type: NOTIFICATION_CLEAR,
        data: { id: 2 }
      });
      const expected = [{ id: 1 }, { id: 3 }];
      expect(actual).toEqual(expected);
    });
  });

  describe('NOTIFICATION_SHOW', () => {
    it('should add the notification to the list of notifications', () => {
      const notif = {
        content: 'content'
      };
      const data = [{ id: 100 }, { id: 200 }];
      const actual = notification(data, {
        type: NOTIFICATION_SHOW,
        data: notif
      });
      const expected = [...data, { ...notif, id: 1 }];
      expect(actual).toEqual(expected);
    });
  });
});
