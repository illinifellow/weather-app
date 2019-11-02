import React, { Component } from "react";
import classnames from "classnames";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { GoSearch } from "react-icons/go";
import { MdClear } from "react-icons/md";
import { setConfiguration, Container, Row, Col } from "react-grid-system";
import { getCitySuggestions, setCity, setFavCity } from "../../actions";
import Input from "../../components/input";
import WeatherCard from "../../components/weather-card";
import ForecastCard from "../../components/forecast-card";
import styles from "./index.module.css";

const DISPLAY_KEY = "LocalizedName";
const SETTING_KEY = "Key";

setConfiguration({
  defaultScreenClass: "sm",
  gridColumns: 5,
  gutterWidth: 16
});

class Home extends Component {
  state = {
    city: "",
    fav: queryString.parse(this.props.history.location.search).city || null
  };

  componentDidMount() {
    if (localStorage.getItem("f")) {
      const city = JSON.parse(localStorage.getItem("f")).find(
        city => city.LocalizedName === this.state.fav
      );
      if (city) {
        this.props.setCity(city);
      } else {
        this.state.fav && this.props.getCitySuggestions(city);
      }
    }
  }

  onSearch = city => {
    this.setState({ city });
    this.props.getCitySuggestions(city);
  };

  onSelect = cityKey => {
    const city =
      this.props.suggestions.find(
        suggestion => suggestion[SETTING_KEY] === cityKey
      ) || null;
    this.setState({ city: city[DISPLAY_KEY] });
    this.props.setCity(city);
  };

  onFavClick = () => this.props.setFavCity(this.props.city);

  render() {
    return (
      <main
        className={classnames(styles.home, {
          [styles.active]: this.props.weather || this.props.forecast
        })}
      >
        <section className={styles.search}>
          <Input
            autoFocus={!this.props.city}
            prefixIcon={<GoSearch />}
            actionIcon={<MdClear />}
            value={this.state.city}
            options={this.props.suggestions}
            optionsLimit={3}
            displayKey={DISPLAY_KEY}
            settingKey={SETTING_KEY}
            placeholder="Start typing"
            onChange={this.onSearch}
            onSelect={this.onSelect}
            onAction={() => this.onSearch("")}
          />
        </section>
        {this.props.weather && (
          <WeatherCard
            system={this.props.system}
            city={this.props.city}
            text={"this.props.weather.WeatherText"}
            onClick={this.onFavClick}
            {...this.props.weather}
          />
        )}
        {this.props.forecast && (
          <Container fluid className={styles.forecast}>
            <Row>
              {this.props.forecast.map(item => (
                <Col sm={1} key={item.EpochDate}>
                  <ForecastCard
                    system={this.props.system}
                    text={"item.Day.ShortPhrase"}
                    {...item}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </main>
    );
  }
}

export default withRouter(
  connect(
    state => ({ ...state }),
    dispatch => ({
      getCitySuggestions: city => dispatch(getCitySuggestions(city)),
      setCity: city => dispatch(setCity(city)),
      setFavCity: city => dispatch(setFavCity(city))
    })
  )(Home)
);
