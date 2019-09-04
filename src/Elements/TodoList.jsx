import React from 'react';
import style from './TodoList.module.css';
import TodoHeader from "./Header/Header";
import TodoFooter from "./Footer/Footer";
import TodoTasks from "./Tasks/TodoTasks";
import axios from "axios";
import instance from "../api";


class TodoList extends React.Component {
    addTask__ = (text) => {
        let usedIdArr = this.state.tasks.map( t=> t.id);
        usedIdArr.sort((a, b) => a - b );

        for ( let i = 0; i < usedIdArr.length; i++) {
            if (usedIdArr[i] === this.nextTaskId) {
                this.nextTaskId++;
            } else {break;}
        }
        let newTask = {
            id: this.nextTaskId,
            isDone: true,
            taskName: text,
            priority: 'low',
        };
        let newTasks = [... this.state.tasks, newTask];
        this.setState({tasks: newTasks}, ()=> { this.saveState(); });
        this.nextTaskId = 1;
    };
    restoreState__ = () => {
        let state = { tasks: [
                {
                    id: 1,
                    isDone: true,
                    taskName: 'JS',
                    priority: 'medium',
                },

            ],
            tasksFilter: 'All',
        };
        let stateAsString = localStorage.getItem('our-state-'+this.props.id);
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state)
    };
    nextTaskId = 1;

    componentDidMount() {
        this.restoreState();
    }

    state = {
        tasks: [],
        tasksFilter: 'All',
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state-'+this.props.id, stateAsString);
    };
    restoreState = () => {
        instance.get(`todo-lists/${this.props.id}/tasks`)
            .then( res => {
                this.setState({tasks: res.data.items });
            });
    };

    addTask = (text) => {
        instance.post(`todo-lists/${this.props.id}/tasks`,{title: text})
            .then( res => {
                let newTask = res.data.data.item;
                this.setState({tasks: [...this.state.tasks, newTask]})
            })
    };

    setFilter = (filter) => {
    this.setState({tasksFilter: filter}, ()=> { this.saveState(); });
};

    isDoneChanger = (taskId, status) => {
        let newTasks = this.state.tasks.map( t => {

            if (t.id === taskId) {
                t.isDone = status;
                return t;
            }else {
                return t;
            }
        });
        this.setState({tasks: newTasks}, ()=> { this.saveState(); })
    };
    taskTitleEdit = (taskId, text) => {
        let newTasks = this.state.tasks.map( t => {

            if (t.id === taskId) {
                t.taskName = text;
                return t;
            }else {
                return t;
            }
        });
    this.setState({tasks: newTasks}, ()=> { this.saveState(); })
    };
    clearStorage = () => {
        let state = { tasks: [
                {
                    isDone: true,
                    taskName: 'JS',
                    priority: 'medium',
                    id: 1,
                },

            ],
            tasksFilter: 'All',
        };
        let stateAsString = JSON.stringify(state);
        localStorage.setItem('our-state-'+this.state.id, stateAsString);
        this.setState(state);
    };
    deleteTask = (taskId) => {
        let newTasks = this.state.tasks.filter( t => {
            if (t.id !== taskId) {
                return true;
            }
        });
        this.setState({tasks: newTasks}, ()=> { this.saveState(); })
    };

    render = () => {


        return (
                <div className={style.todoList}>
                    <TodoHeader
                        title={this.props.title}
                        clearStorage={this.clearStorage}
                        addTask={this.addTask}
                    />

                    <TodoTasks tasks={
                        this.state.tasks.filter( t => {
                            if (this.state.tasksFilter === 'All')
                            return true;
                            if (this.state.tasksFilter === 'Completed')
                                return t.isDone === true;
                            if (this.state.tasksFilter === 'Active')
                                return t.isDone === false;
                        })}
                               isDoneChanger={this.isDoneChanger}
                               taskTitleEdit={this.taskTitleEdit}
                               deleteTask={this.deleteTask}
                    />

                    <TodoFooter
                        filterValue={this.state.tasksFilter}
                        setFilter={this.setFilter}
                    />
                </div>
        );

    }
}

export default TodoList;

