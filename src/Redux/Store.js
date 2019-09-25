import {createStore} from "redux";

const ADD_LIST = 'ADD_LIST';
const ADD_TASK = 'ADD_TASK';
const DELETE_LIST = 'DELETE_LIST';
const DELETE_TASK = 'DELETE_TASK';
const EDIT_TASK = 'EDIT_TASK';


const initialState = {
    todolists: [
        {
            id: 1,
            title: 'Today',
            tasks: [
                {
                    id: 1,
                    isDone: true,
                    taskName: 'JS',
                    priority: 'medium',
                },

            ],
            tasksFilter: 'All',
        },
        {
            id: 2,
            title: 'Tomorrow',
            tasks: [
                {
                    id: 1,
                    isDone: true,
                    taskName: 'JS',
                    priority: 'medium',
                },

            ],
            tasksFilter: 'All',
        },
    ],
};

//actionReducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newList]
            };
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.listId) {
                        return {
                            ...tl,
                            tasks: [action.newTask, ...tl.tasks],
                        }
                    } else {
                        return tl;
                    }
                })
            };
        case DELETE_LIST:
            return {
                ...state,
                todolists: state.todolists.filter( tl => {
            if (tl.id !== action.listId) {
                return true;
            }
            })};
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl=> {
                    if (tl.id === action.listId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => {
                                if (t.id !== action.taskId) {
                                    return true;
                                }
                            })
                        }
                    } else {
                        return tl;
                    }
                })
            };
        case EDIT_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl=> {
                    if (tl.id === action.listId) {
                        return {
                            ...tl,
                        tasks: tl.tasks.map( t => {
                            if (t.id === action.taskId) {
                                switch (action.change) {
                                    case 'isDone':
                                        return {
                                            ...t,
                                            isDone: action.value,
                                        };
                                    case 'title':
                                        return {
                                            ...t,
                                            taskName: action.value,
                                        };
                                    default:
                                        return t;
                                }
                            }else {
                                return t;
                            }
                        })};
                    } else {
                        return tl;
                    }
                })
            };
                default:
            return state;
    }
};

//Action creators
export const addList = (newList) =>({ type: ADD_LIST, newList: newList});
export const addTask = (listId, newTask) =>({type:ADD_TASK, listId: listId, newTask: newTask});
export const deleteList = (listId) =>({type: DELETE_LIST, listId: listId});
export const editTask = (listId, taskId, change, value) =>({
    type: EDIT_TASK, listId: listId, taskId: taskId, change: change, value: value
});
export const deleteTask = (listId, taskId) =>({type: DELETE_TASK, listId: listId, taskId: taskId});


const store = createStore(reducer);
export default store;