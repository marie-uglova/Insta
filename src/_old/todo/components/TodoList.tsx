import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TodoList.css';
import {
    loadTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter
} from '../store/todosSlice';
import { RootState } from '../store';
import { FilterStatus } from '../store/types';

const TodoList: React.FC = () => {
    const dispatch = useDispatch();
    const { todos, filter, isLoading, error } = useSelector((state: RootState) => state.todos);
    const [newTodoTitle, setNewTodoTitle] = useState('');

    // Загрузка задач при монтировании
    useEffect(() => {
        dispatch(loadTodos());
    }, [dispatch]);

    // Фильтрация задач
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    // Обработчики событий
    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodoTitle.trim()) {
            dispatch(addTodo(newTodoTitle));
            setNewTodoTitle('');
        }
    };

    const handleToggleTodo = (id: string) => {
        dispatch(toggleTodo(id));
    };

    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id));
    };

    const handleSetFilter = (filter: FilterStatus) => {
        dispatch(setFilter(filter));
    };

    // Состояние загрузки/ошибки
    if (isLoading) return <div className="loading">Загрузка задач...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;

    return (
        <div className="todo-list">
            <h1>Список задач</h1>

            {/* Форма добавления новой задачи */}
            <form onSubmit={handleAddTodo} className="todo-form">
                <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    placeholder="Введите задачу"
                    className="todo-input"
                />
                <button type="submit" className="add-button">
                    Добавить
                </button>
            </form>

            {/* Фильтры */}
            <div className="filters">
                <button
                    onClick={() => handleSetFilter('all')}
                    className={filter === 'all' ? 'active' : ''}
                >
                    Все
                </button>
                <button
                    onClick={() => handleSetFilter('active')}
                    className={filter === 'active' ? 'active' : ''}
                >
                    Активные
                </button>
                <button
                    onClick={() => handleSetFilter('completed')}
                    className={filter === 'completed' ? 'active' : ''}
                >
                    Выполненные
                </button>
            </div>

            {/* Список задач */}
            <ul className="todos">
                {filteredTodos.map(todo => (
                    <li key={todo.id} className="todo-item">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleTodo(todo.id)}
                            className="todo-checkbox"
                        />
                        <span
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                opacity: todo.completed ? 0.7 : 1
                            }}
                            className="todo-text"
                        >
              {todo.title}
            </span>
                        <button
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="delete-button"
                        >
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
