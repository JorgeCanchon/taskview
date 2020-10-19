import { combineReducers } from 'redux';
import reducerTodo  from './todo/index';

export const allReducers = combineReducers({
    todos: reducerTodo
});

export default allReducers;