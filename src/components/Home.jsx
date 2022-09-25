import React, { useState } from 'react';
import useFetch from '../Hooks/useFetch';
import Button from './Form/Button';
import Input from './Form/input';
import styles from './Home.module.css';

const Home = () => {
  const [cidade, setCidade] = React.useState();
  const { loading, error, request, data } = useFetch();

  async function busca(event) {
    event.preventDefault();
    const { response, json } = await request(
      `http://api.weatherapi.com/v1/forecast.json?key=9a6293679f5d46efb89225346221809&q=${cidade}&lang=pt`,
    );
  }

  return (
    <div className={styles.main + ' container'}>
      <form
        className={styles.main_form}
        onChange={(event) => {
          event.preventDefault();
          setCidade(event.target.value);
        }}
      >
        <Input
          label={
            cidade
              ? cidade.charAt(0).toUpperCase() +
                cidade.slice(1) +
                ' | Procure outra cidade:'
              : 'Cidade'
          }
          type="text"
          name="cidade"
          {...cidade}
        />
        {loading ? (
          <Button disabled>Buscando...</Button>
        ) : (
          <Button onClick={busca}>Buscar</Button>
        )}
      </form>
      {data ? (
        <div className={styles.main_tempo}>
          <div className={styles.tempo_name}>
            <h1>
              {data.location.name}, {data.location.region}
            </h1>
            <img src={data.current.condition.icon} alt="" />
          </div>
          <div className={styles.tempo}>
            <p className={styles.tempo_c}>{data.current.temp_c}°C |</p>
            <p>{data.current.condition.text}</p>
          </div>
          <div>
            <h2 className={styles.maxmin_title}>Temperatura | Min, Max</h2>
            <div className={styles.maxmin}>
              <h3 className={styles.min}>
                {data.forecast.forecastday[0].day.mintemp_c + '°C'}
              </h3>
              <h3 className={styles.max}>
                {data.forecast.forecastday[0].day.maxtemp_c + '°C'}
              </h3>
            </div>
          </div>
          <div className={styles.horarios}>
            <ul>
              <li>00:00</li>
              <li>{data.forecast.forecastday[0].hour[0].temp_c + '°C'}</li>
            </ul>
            <ul>
              <li>03:00</li>
              <li>{data.forecast.forecastday[0].hour[3].temp_c + '°C'}</li>
            </ul>
            <ul>
              <li>06:00</li>
              <li>{data.forecast.forecastday[0].hour[6].temp_c + '°C'}</li>
            </ul>
            <ul>
              <li>09:00</li>
              <li>{data.forecast.forecastday[0].hour[9].temp_c + '°C'}</li>
            </ul>
            <ul>
              <li>12:00</li>
              <li>{data.forecast.forecastday[0].hour[12].temp_c + '°C'}</li>
            </ul>
            <ul>
              <li>15:00</li>
              <li>{data.forecast.forecastday[0].hour[15].temp_c + '°C'}</li>
            </ul>
            <ul>
              <li>18:00</li>
              <li>{data.forecast.forecastday[0].hour[18].temp_c + '°C'}</li>
            </ul>
            <ul>
              <li>21:00</li>
              <li>{data.forecast.forecastday[0].hour[21].temp_c + '°C'}</li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
