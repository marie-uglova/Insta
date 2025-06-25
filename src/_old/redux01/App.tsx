//import { useState } from 'react'
import './App.css'
//import {DecrementAction, IncrementAction, store} from "./store";
import {DecrementAction, IncrementAction, CounterId, RootState, store} from "./store2";
import {useEffect, useReducer} from "react";

const App = () => {
    //const [count, setCount] = useState<number>(initialValue)
    const[, forceUpdate] = useReducer((x) => x + 1, 0);

    //useEffect нужен, чтобы интегрировать состояние реакта с внешними state-менеджерами, например, redux
    useEffect(() => {
        // функция вызывается каждый раз, когда action летит в store
        const unsubscribe = store.subscribe(() => {
            forceUpdate();
        });
        return unsubscribe;
    }, [])

    return (
        <div className="App">
            <h1>Vite + React + TypeScript</h1>
            <Counter counterId='first' />
            <Counter counterId='second' />
            {/*<p>Счетчик: {store.getState().counter}</p>
            <button
                className="btn btn-primary me-2"
                onClick={() => store.dispatch({type: 'increment'} satisfies IncrementAction)}
            >
                Увеличить
            </button>
            <button
                className="btn btn-primary me-2"
                onClick={() => store.dispatch({type: 'decrement'} satisfies DecrementAction)}
            >
                Уменьшить
            </button>*/}
        </div>
    )
}

export function Counter({counterId}: {counterId: CounterId}){
    const[, forceUpdate] = useReducer((x) => x + 1, 0);

    //useEffect нужен, чтобы интегрировать состояние реакта с внешними state-менеджерами, например, redux
    useEffect(() => {
        // функция вызывается каждый раз, когда action летит в store
        const unsubscribe = store.subscribe(() => {
            forceUpdate();
        });
        return unsubscribe;
    }, [])

    return(
        <>
            <p>Счетчик: {store.getState().counters[counterId]?.counter}</p>
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
