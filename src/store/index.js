import { Subject } from 'rxjs';

import EventEmitter from 'wolfy87-eventemitter'
const Event = new EventEmitter();

const subject = new Subject();

const initialState = {
  data: {
    temperature: 0,
    airPressure: 0,
    humidity: 0
  }
};

let state = initialState;

const analyticsStore = {
  init: () => {
    state = {...state}
    subject.next(state)
    Event.on('store', (obj)=>{
      state = {...state, data: obj}
    })
    setTimeout(()=>{
      if(state.data.temperature === 0){
        state = {...state, data: {...state.data, temperature: 'N/A' }}
      }
      if(state.data.airPressure === 0){
        state = {...state, data: {...state.data, airPressure: 'N/A' }}
      }
      if(state.data.humidity === 0){
        state = {...state, data: {...state.data, humidity: 'N/A' }}
      }
    }, 1000)
  },
  subscribe: setState => subject.subscribe(setState),
  
  getData: () => {
    let temp = (Math.random() * 10)
    let pressure = (Math.random() * 10)
    let hum = (Math.random() * 10)
    let obj = { temperature: (Math.random() * 10), airPressure: (Math.random() * 10), humidity: (Math.random() * 10)   };
    if(temp !== state.data.temperature || pressure !== state.data.airPressure || hum !== state.data.humidity ){
      Event.emit('store', obj)
    }
    subject.next(state);
  },
  initialState
};

export default analyticsStore;
