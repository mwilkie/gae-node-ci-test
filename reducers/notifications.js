import {
  NOTIFICATION_CLEAR,
  NOTIFICATION_SHOW
} from '../actions/notifications';

let cid = 0;

export default function user(state = [], action) {
  switch (action.type) {
    case NOTIFICATION_CLEAR:
      return state.filter(({ id }) => id !== action.data.id);
    case NOTIFICATION_SHOW:
      cid += 1;
      return [...state, { ...action.data, id: cid }];
    default:
      return state;
  }
}
