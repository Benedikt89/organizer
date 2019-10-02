import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '0f32e29f-2408-4879-8199-f94cc9bd7861'}
});

export const todoListAPI = {
    getLists() {
        return instance.get('todo-lists')
            .then(res => {
                return res.data;
            })
    },
    addList(listTitle) {
        return instance.post('todo-lists', {title: listTitle})
            .then( res => {
                if (res.data.resultCode === 0) {
                    return res.data.data;
                }
            })
    },
    deleteList(listId) {
        return instance.delete('todo-lists/'+ listId)
            .then(res =>{
                if(res.data.resultCode === 0) {
                    return res.data;
                }
            })
    },
};

export const taskAPI = {
    getTasks(listId) {
        return instance.get(`todo-lists/${listId}/tasks`)
            .then(res => {
                return res.data;
            })
    },
    addTask(listId, taskTitle) {
        return instance.post(`todo-lists/${listId}/tasks`, {title: taskTitle})
            .then( res => {
                if (res.data.resultCode === 0) {
                    return res.data.data;
                }
            })
    },
    deleteTask(taskId) {
        return instance.delete('todo-lists/tasks/'+ taskId)
            .then(res =>{
                if(res.data.resultCode === 0) {
                    return res.data;
                }
            })
    },
    editTask(newTask) {
        return instance.put(`todo-lists/tasks`, newTask)
            .then( res => {
                if (res.data.resultCode === 0) {
                    return res.data.data;
                }
            })
    },
};