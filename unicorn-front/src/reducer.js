export const initialState = {
  user: null,
  homeFields: null,
  selectedLocation: null,
  selectedDate: null,
  pitchSearched: null,
  userNotifications: null,
};
export const actionTypes = {
  SET_USER: "SET_USER",
  SET_HOME_FIELDS: "SET_HOME_FIELDS",
  SET_SELECTED_DATE: "SET_SELECTED_DATE",
  SET_SELECTED_LOCATION: "SET_SELECTED_LOCATION",
  SET_PITCH_SEARCHED: "SET_PITCH_SEARCHED",
  SET_USER_NOTIFICATIONS: "SET_USER_NOTIFICATIONS",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_HOME_FIELDS:
      return {
        ...state,
        homeFields: action.homeFields,
      };
    case actionTypes.SET_SELECTED_LOCATION:
      return {
        ...state,
        selectedLocation: action.selectedLocation,
      };
    case actionTypes.SET_PITCH_SEARCHED:
      return {
        ...state,
        pitchSearched: action.pitchSearched,
      };
    case actionTypes.SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.selectedDate,
      };
    case actionTypes.SET_USER_NOTIFICATIONS:
      return {
        ...state,
        userNotifications: action.userNotifications,
      };
    default:
      return state;
  }
};
export default reducer;
