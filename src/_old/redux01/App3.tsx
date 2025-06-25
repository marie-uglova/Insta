//import { useState } from 'react'
import './App.css'
//import {DecrementAction, IncrementAction, store} from "./store";
import {DecrementAction, IncrementAction, CounterId, RootState, store, useAppSelector, selectCounter} from "./store2";
import {useEffect, useReducer, useRef} from "react";
import {useDispatch, useSelector, useStore} from "react-redux";

const App = () => {
    return (
        <div className="App">
            <h1>Vite + React + TypeScript</h1>
            <Counter counterId='first' />
            <Counter counterId='second' />
        </div>
    )
}

export function Counter({counterId}: {counterId: CounterId}) {
    // встроенные хуки, аналоги store.getState, store.dispatch
    const dispatch = useDispatch();
    // useSelector - это аналог условия с currentState и lastState, useAppSelector здесь - обертка для типизации
    const counterState = useAppSelector(state => selectCounter(state, counterId));
    useStore();

    return(
        <>
            <p>Счетчик: {counterState?.counter}</p>
            <button
                className="btn btn-primary me-2"
                onClick={() => dispatch({type: 'increment', payload: {counterId}} satisfies IncrementAction)}
            >
                Увеличить
            </button>
            <button
                className="btn btn-primary me-2"
                onClick={() => dispatch({type: 'decrement', payload: {counterId}} satisfies DecrementAction)}
            >
                Уменьшить
            </button>
        </>
    );
}

export default App
