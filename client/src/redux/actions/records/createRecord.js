import {
  CREATE_RECORD_START,
  CREATE_RECORD_SUCCESS,
  CREATE_RECORD_FAILURE,
} from "../../actionTypes/record";

const createRecordStart = () => ({
  type: CREATE_RECORD_START,
});

const createRecordSuccess = (data) => ({
  type: CREATE_RECORD_SUCCESS,
  payload: { data },
});

const createRecordFailure = (error) => ({
  type: CREATE_RECORD_FAILURE,
  payload: { error },
});

export const createRecord = (formValues) => async (dispatch) => {
  try {
    dispatch(createRecordStart());
    const data = {};
    dispatch(createRecordSuccess(data));
  } catch (error) {
    dispatch(createRecordFailure(error));
  }
};
