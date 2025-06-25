import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, FilterStatus } from './types';

// Имитация загрузки задач с API
const fetchTodos = async (): Promise<Todo[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: '1', title: 'Изучить Redux', completed: false },
                { id: '2', title: 'Написать Todo App', completed: true },
            ]);
        }, 1000);
    });
};

// createAsyncThunk генерирует pending/fulfilled/rejected экшены
export const loadTodos = createAsyncThunk('todos/loadTodos', async () => {
    return await fetchTodos();
});

interface TodosState {
    todos: Todo[];
    filter: FilterStatus;
    isLoading: boolean;
    error: string | null;
}

const initialState: TodosState = {
    todos: [],
    filter: 'all',
    isLoading: false,
    error: null,
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: Todo = {
                id: Date.now().toString(),
                title: action.payload,
                completed: false,
            };
            state.todos.push(newTodo);
        },
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find((t) => t.id === action.payload);
            if (todo) todo.completed = !todo.completed;
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        setFilter: (state, action: PayloadAction<FilterStatus>) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadTodos.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.isLoading = false;
            })
            .addCase(loadTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Ошибка загрузки задач';
            });
    },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter } = todosSlice.actions;
export default todosSlice.reducer;
