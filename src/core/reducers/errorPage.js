import {
  REDUX_CONNECT_END_GLOBAL_LOAD,
  REDUX_CONNECT_LOAD_FAIL,
} from 'core/constants';

export const initialState = {
  clearOnNext: false,
  error: null,
  hasError: false,
  statusCode: null,
};

export default function errorPage(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case REDUX_CONNECT_END_GLOBAL_LOAD:
      if (state.clearOnNext) {
        return { ...state, ...initialState };
      }
      return { ...state, clearOnNext: true };
    case REDUX_CONNECT_LOAD_FAIL:
      return {
        ...state,
        error: payload.error,
        hasError: true,
        statusCode: payload.error.response.status,
      };
    default:
      return state;
  }
}
