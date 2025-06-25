import { configureStore } from '@reduxjs/toolkit';
import {useDispatch, useSelector, useStore} from "react-redux";

type CounterState = {
    counter: number;
}
export type CounterId = string;

type State = {
    counters: Record<CounterState, CounterId | undefined>
}
export type IncrementAction = {
    type: 'increment';
    payload: {
        counterId: CounterId;
    }
}
export type DecrementAction = {
    type: 'decrement';
    payload: {
        counterId: CounterId;
    }
}
type Action = IncrementAction | DecrementAction;

const initialCounterState: CounterState = {counter: 0};
const initialState: State = {
    counters:  {}
}

export const reducerMethod = (state = initialState, action: Action): State => {
    switch (action.type) {
        case 'increment': {
            const {counterId} = action.payload;
            const currentCounter = state.counters[counterId] ?? initialCounterState; // если counter не идентифицирован, то обнуляем счетчик
            return {
                ...state,
                counters: {
                    ...state.counters,
                    [counterId]: {
                        ...currentCounter,
                        counter: currentCounter.counter + 1,
                    }
                }
            };
        }
        case 'decrement': {
            const {counterId} = action.payload;
            const currentCounter = state.counters[counterId] ?? initialCounterState;
            return {
                ...state,
                counters: {
                    ...state.counters,
                    [counterId]: {
                        ...currentCounter,
                        counter: currentCounter.counter - 1,
                    }
                }
            };
        }
        default:
            return state;
    }
}

export const store = configureStore({
    reducer: reducerMethod,
})

export const selectCounter = (state: RootState, counterId: CounterId) => state.counters[counterId];

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// типизирование, т.к. useSelector и другие хуки ничего не знают о структуре store
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
