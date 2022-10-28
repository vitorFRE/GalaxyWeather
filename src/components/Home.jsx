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
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${
        import.meta.env.VITE_SOME_WEATHER_API_KEY
      }&lang=pt_br`,
    );
    console.log(data);
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
              {data.name}, {data.sys.country}
            </h1>
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
              alt=""
            />
          </div>
          <div className={styles.tempo}>
            <p className={styles.tempo_c}>{data.main.temp}°C |</p>
            <p>{data.weather[0].description}</p>
          </div>
          <div>
            <h2 className={styles.maxmin_title}>Temperatura | Min, Max</h2>
            <div className={styles.maxmin}>
              <h3 className={styles.min}>{data.main.temp_min + '°C'}</h3>
              <h3 className={styles.max}>{data.main.temp_max + '°C'}</h3>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
