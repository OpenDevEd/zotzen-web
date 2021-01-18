import {
  CREATE_RECORD_START,
  CREATE_RECORD_SUCCESS,
  CREATE_RECORD_FAILURE,
} from "../actionTypes/record";

const INITIAL_STATE = { loading: false, error: null, records: [] };

const createRecordReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CREATE_RECORD_START:
      return { ...state, loading: true, error: null };
    case CREATE_RECORD_SUCCESS:
      return {
        ...state,
        records: state.records.concat(payload.data),
        loading: false,
      };
    case CREATE_RECORD_FAILURE:
      return { ...state, error: payload.error, loading: false };
    default:
      return state;
  }
};

export default createRecordReducer;
