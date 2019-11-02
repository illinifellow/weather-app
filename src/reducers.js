import actionTypes from "./types";

const initialState = {
  location: null,
  weather: null,
  forecast: null,
  suggestions: null,
  city: null,
  system: localStorage.getItem("s") === "true"
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SYSTEM_SUCCESS:
      return {
        ...state,
        system: action.system
      };
    case actionTypes.GET_LOCATION_REQUEST:
      return {
        ...state,
        location: null
      };
    case actionTypes.GET_LOCATION_SUCCESS:
      return {
        ...state,
        location: {
          latitude: action.location.coords.latitude,
          longitude: action.location.coords.longitude
        }
      };
    case actionTypes.GET_CITY_BY_LOCATION_REQUEST:
      return {
        ...state,
        city: null
      };
    case actionTypes.GET_CITY_BY_LOCATION_SUCCESS:
      return {
        ...state,
        city: action.city
      };
    case actionTypes.GET_CITY_SUGGESTIONS_REQUEST:
      return {
        ...state,
        suggestions: null
      };
    case actionTypes.GET_CITY_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        suggestions: action.suggestions
      };
    case actionTypes.SET_CITY_SUCCESS:
      return {
        ...state,
        city: action.city
      };
    case actionTypes.GET_WEATHER_REQUEST:
      return {
        ...state,
        suggestions: null,
        weather: null
      };
    case actionTypes.GET_WEATHER_SUCCESS:
      return {
        ...state,
        weather: action.weather
      };
    case actionTypes.GET_FORECAST_REQUEST:
      return {
        ...state,
        suggestions: null,
        forecast: null
      };
    case actionTypes.GET_FORECAST_SUCCESS:
      return {
        ...state,
        forecast: action.forecast
      };
    case actionTypes.SET_FAV_CITY_SUCCESS:
      return {
        ...state,
        city: action.city
      };
    case actionTypes.SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
