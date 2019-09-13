import React from 'react';
import style from './TodoList.module.css';
import TodoHeader from "./Header/Header";
import TodoFooter from "./Footer/Footer";
import TodoTasks from "./Tasks/TodoTasks";


class TodoList extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    state = {
        tasks: [
            {
                id: 1,
                isDone: true,
                taskName: 'JS',
                priority: 'medium',
            },

        ],
        tasksFilter: 'All',
    };

    nextTaskId = 1;

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state-'+this.props.id, stateAsString);
    };

    restoreState = () => {
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

    setFilter = (filter) => {
    this.setState({tasksFilter: filter}, ()=> { this.saveState(); });
};

    addTask = (text) => {
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

