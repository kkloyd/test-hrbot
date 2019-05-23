import React from 'react';
import DevTools from 'mobx-react-devtools';
import styled from 'styled-components';
import Search from './components/Search';
import WeatherInfo from './components/WeatherInfo';


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 50px;
`;

const App = () => (
  <div>
    <Wrapper>
      <Search />
      <WeatherInfo />
    </Wrapper>
    <DevTools />
  </div>
);

export default App;
