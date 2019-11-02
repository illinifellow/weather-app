export function isFav(CityKey) {
  const favs = JSON.parse(localStorage.getItem("f"));
  return !!favs.find(fav => fav.Key === CityKey);
}

export function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

export function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
