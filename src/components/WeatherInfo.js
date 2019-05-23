import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import WeatherStore from '../stores/WeatherStore';


const getWeatherData = (e, inputStore, weatherStore) => {
  if (e && e.key === 'Enter')
    console.log(weatherStore.getData(e.target.value));
};

// dumb status data
const statuses = {
  error: 'error',
  loading: 'loading',
  success: 'success',
};

const renderInfo = weatherStore => {
  let content = '';
  if (weatherStore.status === statuses.success)
    content = (
      <div>
        <p>
          Город:
          { '  ' }
          { weatherStore.city }
        </p>
        <p>
          Температура:
          { '  ' }
          { weatherStore.temperature }
        </p>
        <p>
          Местоположение:
          { '  ' }
          { weatherStore.coordinates.lat }
          ,
          { ' ' }
          { weatherStore.coordinates.lon }
        </p>
      </div>

    );
  else if (weatherStore.status === statuses.error)
    content = (
      <p>
        Не нашлось такого города
      </p>
    );


  return content;
};

const WeatherInfo = observer(({ className }) => {
  const weatherStore = useContext(WeatherStore);
  console.log(weatherStore.status);

  return (
    <div className={className}>
      { renderInfo(weatherStore) }
    </div>
  );
});

const StyledWeatherInfo = styled(WeatherInfo)`
  border: 1px solid lightgray;
  border-radius: 3px;
  margin: 10px;
  padding: 10px;
  width: 50%;
`;


export default StyledWeatherInfo;
