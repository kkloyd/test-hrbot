import {
  observable, computed, configure, action,
} from 'mobx';
import { createContext } from 'react';


configure({ enforceActions: 'observed' });

const gray = '#9E9E9E';
const green = '#009688';

// contains city, icon and input border colors
class InputStyleStore {
  @observable city = '';
  @observable iconColor = gray;
  @observable inputBorderColor = gray;

  @action setCity(value) {
    this.city = value;
  }

  @action setActiveInput() {
    this.iconColor = green;
    this.inputBorderColor = green;
  }

  @action setInactiveInput() {
    this.iconColor = gray;
    this.inputBorderColor = gray;
  }

}


export default createContext(new InputStyleStore());
