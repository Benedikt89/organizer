import {taskAPI, todoListAPI} from "../api/api";

const ADD_LIST = 'ADD_LIST';
const ADD_TASK = 'ADD_TASK';
const DELETE_LIST = 'DELETE_LIST';
const DELETE_TASK = 'DELETE_TASK';
const EDIT_TASK = 'EDIT_TASK';
const GET_TASK = 'GET_TASK';
const GET_LISTS = 'GET_LISTS';


const initialState = {
    todolists: [],
};

//actionReducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LISTS:
            return {
                ...state,
                todolists: action.data,
            };
        case GET_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if(tl.id === action.listId){
                        return {...tl, tasks: action.tasks}
                    } else {
                        return tl;
                    }
                }),
            };
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
                            if (t.id === action.newTask.id) {
                                return action.newTask;
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
export default reducer;

//Action creators
const _addList = (newList) =>({ type: ADD_LIST, newList: newList});
const _addTask = (listId, newTask) =>({type:ADD_TASK, listId: listId, newTask: newTask});
const _deleteList = (listId) =>({type: DELETE_LIST, listId: listId});
const _deleteTask = (listId, taskId) =>({type: DELETE_TASK, listId: listId, taskId: taskId});
export const _editTask = (listId, newTask) =>({type: EDIT_TASK, listId, newTask});

export const addList = (listTitle) => (dispatch) => {
    todoListAPI.addList(listTitle)
        .then(data => {
            let newList = data.item;
            dispatch(_addList(newList));
        })
};
export const addTask = (listId, taskTitle) => (dispatch) => {
    taskAPI.addTask(listId, taskTitle)
        .then(data => {
            let newTask = data.item;
            dispatch(_addTask(listId, newTask))
        })
};
export const deleteList = (listId) => (dispatch) => {
    todoListAPI.deleteList(listId)
        .then( data => {
            dispatch(_deleteList(listId))
        })
};
export const deleteTask = (listId, taskId) => (dispatch) => {
    taskAPI.deleteTask(taskId)
        .then( data => {
                dispatch(_deleteTask(listId, taskId))
            })
};
export const editTask = (listId, newTask) => (dispatch) => {
    taskAPI.editTask(newTask)
        .then(data => {
            let newTask = data.item;
            dispatch(_editTask(listId, newTask))
        })
};

export const getLists = () => (dispatch) => {
    todoListAPI.getLists()
        .then( data => {
            dispatch({type: GET_LISTS, data})
        })
};
export const getTasks = (listId) => (dispatch) => {
    taskAPI.getTasks(listId)
        .then( data => {
            let tasks = data.items;
            dispatch({type: GET_TASK, listId, tasks})
        })
};

