// store.js
import { createStore } from 'redux';


const initialState = {
    tasks: [],
    selectedTask: null
};


const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload] };
        case 'DELETE_TASK':
            return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) }; // Delete task
        case 'SET_SELECTED_TASK':
            return { ...state, selectedTask: action.payload };
        default:
            return state;
    }
};


const store = createStore(taskReducer);

export default store;
