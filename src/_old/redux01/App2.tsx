//import { useState } from 'react'
import './App.css'
//import {DecrementAction, IncrementAction, store} from "./store";
import {DecrementAction, IncrementAction, CounterId, RootState, store} from "./store2";
import {useEffect, useReducer, useRef} from "react";

const App = () => {
    return (
        <div className="App">
            <h1>Vite + React + TypeScript</h1>
            <Counter counterId='first' />
            <Counter counterId='second' />
        </div>
    )
}

const selectCounter = (state: RootState, counterId: CounterId) => state.counters[counterId];

export function Counter({counterId}: {counterId: CounterId}){
    const[, forceUpdate] = useReducer((x) => x + 1, 0);

    const lastStateRef = useRef<ReturnType<typeof selectCounter>>();

    //useEffect нужен, чтобы интегрировать состояние реакта с внешними state-менеджерами, например, redux
    useEffect(() => {
        // функция вызывается каждый раз, когда action летит в store
        const unsubscribe = store.subscribe(() => {
            // это ссылки
            const currentState = selectCounter(store.getState(), counterId);
            const lastState = lastStateRef.current;

            if(currentState !== lastState) {
                console.log(currentState, ' не равно ', lastState)
                forceUpdate();
            }

            lastStateRef.current = currentState;

        });
        return unsubscribe;
    }, [])

    const counterState = selectCounter(store.getState(), counterId);

    return(
        <>
            <p>Счетчик: {counterState?.counter}</p>
            <button
                className="btn btn-primary me-2"
                onClick={() => store.dispatch({type: 'increment', payload: {counterId}} satisfies IncrementAction)}
            >
                Увеличить
            </button>
            <button
                className="btn btn-primary me-2"
                onClick={() => store.dispatch({type: 'decrement', payload: {counterId}} satisfies DecrementAction)}
            >
                Уменьшить
            </button>
        </>
    );
}

export default App
