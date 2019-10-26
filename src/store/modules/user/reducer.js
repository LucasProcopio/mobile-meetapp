import produce from 'immer';

const INITAL_STATE = {
  profile: null,
  loading: false,
};

export default function(state = INITAL_STATE, action) {
  return produce(state, draftState => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draftState.profile = action.payload.user;
        break;
      }
      case '@user/UPDATE_PROFILE_REQUEST': {
        draftState.loading = true;
        break;
      }
      case '@user/UPDATE_PROFILE_FAILURE': {
        draftState.loading = false;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draftState.profile = action.payload.profile;
        draftState.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draftState.profile = null;
        break;
      }
      default:
    }
  });
}
