import actionTypes from "./types";
import { isFav } from "./helpers";
import __mock__cityByLocation from "./__mocks/city-by-location";
import __mock__suggestions from "./__mocks/suggestions";
import __mock__weather from "./__mocks/weather";
import __mock__forecast from "./__mocks/forecast";

const API = `//dataservice.accuweather.com`;
const KEY = `FzI7LD3KtanTsaOANtooErb50OLQAvsS`; // dodQ7GWnm8N6kzWgYsmfz01MImCGHhrx
const IMAGE_API = `//api.teleport.org/api`;

export function setSystem() {
  return dispatch => {
    const system = localStorage.getItem("s") === "true" ? false : true;
    localStorage.setItem("s", system);
    dispatch({ type: actionTypes.SET_SYSTEM_SUCCESS, system });
  };
}

export function setCityByLocation() {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(location => {
      fetch(
        `${API}/locations/v1/cities/geoposition/search?apikey=${KEY}&q=${location.coords.latitude}%2C${location.coords.longitude}&details=true&toplevel=true`
      )
        .then(data => data && data.json())
        .then(data => {
          data && dispatch(setCity(data));
        })
        .catch(error => {
          console.error(error);
          dispatch(setCity(__mock__cityByLocation));
        });
    });
  };
}

export function getCitySuggestions(slug) {
  return dispatch => {
    dispatch({ type: actionTypes.GET_CITY_SUGGESTIONS_REQUEST });
    fetch(
      `${API}/locations/v1/cities/autocomplete?apikey=${KEY}&q=${slug}&details=true`
    )
      .then(data => data && data.json())
      .then(data => {
        data &&
          dispatch({
            type: actionTypes.GET_CITY_SUGGESTIONS_SUCCESS,
            suggestions: data
          });
      })
      .catch(error => {
        console.error(error);
        dispatch({
          type: actionTypes.GET_CITY_SUGGESTIONS_SUCCESS,
          suggestions: __mock__suggestions
        });
      });
  };
}

export function setCity(city) {
  const slug = city.LocalizedName.toLowerCase()
    .split(" ")
    .join("-");
  return dispatch => {
    dispatch({ type: actionTypes.SET_CITY_REQUEST });
    dispatch({
      type: actionTypes.SET_CITY_SUCCESS,
      city: { ...city, isFav: isFav(city.Key), image: null }
    });
    dispatch(getWeather(city));
    dispatch(getForecst(city));
    fetch(`${IMAGE_API}/urban_areas/slug:${slug}/images/`)
      .then(data => data.json())
      .then(response => {
        response.photos &&
          response.photos.length > 0 &&
          dispatch({
            type: actionTypes.SET_CITY_SUCCESS,
            city: {
              ...city,
              isFav: isFav(city.Key),
              image: response.photos[0].image.mobile
            }
          });
      });
  };
}

export function setFavCity(city) {
  return dispatch => {
    dispatch({ type: actionTypes.SET_FAV_CITY_REQUEST });
    const favs = JSON.parse(localStorage.getItem("f"));
    let newFavs = [...favs];
    favs.find(fav => fav.Key === city.Key)
      ? (newFavs = favs.filter(fav => fav.Key !== city.Key))
      : newFavs.push(city);
    localStorage.setItem("f", JSON.stringify(newFavs));
    dispatch({
      type: actionTypes.SET_FAV_CITY_SUCCESS,
      city: { ...city, isFav: !city.isFav }
    });
  };
}

export function getWeather(city) {
  return dispatch => {
    dispatch({ type: actionTypes.GET_WEATHER_REQUEST });
    fetch(`${API}/currentconditions/v1/${city.Key}?apikey=${KEY}&details=true`)
      .then(data => data && data.json())
      .then(data => {
        data &&
          dispatch({
            type: actionTypes.GET_WEATHER_SUCCESS,
            weather: data[0]
          });
      })
      .catch(error => {
        console.error(error);
        dispatch({
          type: actionTypes.GET_WEATHER_SUCCESS,
          weather: __mock__weather
        });
      });
  };
}

export function getForecst(city) {
  return dispatch => {
    dispatch({ type: actionTypes.GET_FORECAST_REQUEST });
    fetch(
      `${API}/forecasts/v1/daily/5day/${city.Key}?apikey=${KEY}&details=true&metric=true`
    )
      .then(data => data && data.json())
      .then(data => {
        data &&
          dispatch({
            type: actionTypes.GET_FORECAST_SUCCESS,
            forecast: data.DailyForecasts
          });
      })
      .catch(error => {
        console.error(error);
        dispatch({
          type: actionTypes.GET_FORECAST_SUCCESS,
          forecast: __mock__forecast.DailyForecasts
        });
      });
  };
}
