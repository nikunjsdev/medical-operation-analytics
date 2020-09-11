import { Observable, Subject, interval } from 'rxjs';

const subject = new Subject();

const initialState = {
    temperature: 0,
    airPressure: 0,
    humidity: 0
};

let state = initialState;

const generateRandomNumber = () => {
    return Math.random() * 10
}

const generateTimeSpan = () => {
    return Math.random() * (2000 - 100) + 100;
}

const anotherStore =  {
    init: () => {
        state = {...state}
        subject.next(state)
        interval(1000).pipe(() => {
            if(state.temperature === 0){
                state = {...state, temperature: 'N/A' }
            }
            if(state.airPressure === 0){
                state = {...state, airPressure: 'N/A' }
            }
            if(state.humidity === 0){
                state = {...state, humidity: 'N/A' }
            }
        })
    },
    subscribe: setState => subject.subscribe(setState),
    setTemperature: new Observable(sub => {
        let timeout = null;
        (function push() {
            timeout = setTimeout(
                () => {
                    subject.next({
                        ...state,
                        airPressure: generateRandomNumber(),
                        temperature: generateRandomNumber(),
                        humidity: generateRandomNumber(),
                    });
                    push();
                },
                generateTimeSpan()
            );
        })();
        return () => clearTimeout(timeout);
    }),
    initialState
}

export default anotherStore;
