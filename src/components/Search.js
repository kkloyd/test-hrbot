import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import InputStyleStore from '../stores/InputStyleStore';
import WeatherStore from '../stores/WeatherStore';
import { ReactComponent as LocationIcon } from '../icons/location.svg';


const StyledLocationIcon = styled.svg`
  margin: auto;
  path {
    fill: ${props => props.fillcolor};
  }
`;

const InputBlock = styled.div`
  border: 1px solid #9e9e9e;
  border-color: ${props => props.bordercolor};
  border-radius: 4px;
  display: flex;
  height: 30px;
  padding: 0 3px;
  width: 150px;
`;

const Input = styled.input`
  border: none;
  border-radius: 4px;
  padding: 0 5px;
  width: 100%;
  :focus {
    outline: none;
  }
`;


const handleSubmit = (e, weatherStore) => {
  // on Enter key
  if (e && e.key === 'Enter' && e.target.value.trim())
    weatherStore.getData(e.target.value.trim());
};

const checkInput = (e, inputStyleStore) => {
  // inactive style for input only if empty
  if (e.target.value.trim() === '')
    inputStyleStore.setInactiveInput();
};

const handleChange = (e, inputStyleStore) => {
  if (e)
    inputStyleStore.setCity(e.target.value.trim());
};

const Search = observer(({ className }) => {
  const inputStyleStore = useContext(InputStyleStore);
  const weatherStore = useContext(WeatherStore);

  return (
    <div className={className}>
      <p>Введите город:</p>
      <InputBlock
        bordercolor={inputStyleStore.inputBorderColor}
      >
        <StyledLocationIcon as={LocationIcon} fillcolor={inputStyleStore.iconColor} />
        <Input
          type='text'
          onChange={e => handleChange(e, inputStyleStore)}
          onKeyDown={e => handleSubmit(e, weatherStore)}
          onFocus={() => inputStyleStore.setActiveInput()}
          onBlur={e => checkInput(e, inputStyleStore)}
        />
      </InputBlock>
      <p>
        Город:
        { '  ' }
        { inputStyleStore.city }
      </p>
    </div>
  );
});

const StyledSearch = styled(Search)`
  border: 1px solid lightgray;
  border-radius: 3px;
  width: 50%;
  margin: 10px;
  padding: 10px;
`;


export default StyledSearch;
