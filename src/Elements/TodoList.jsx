import React from 'react';
import style from './TodoList.module.css';
import TodoHeader from "./Header/Header";
import TodoFooter from "./Footer/Footer";
import TodoTasks from "./Tasks/TodoTasks";


class TodoList extends React.Component {

    // componentDidMount() {
    //     this.restoreState();
    // }

    state = {
        tasks: this.props.tasks,
        tasksFilter: 'All',
    };

    // saveState = () => {
    //     let stateAsString = JSON.stringify(this.state);
    //     localStorage.setItem('our-state-'+this.props.id, stateAsString);
    // };
    //
    // restoreState = () => {
    //     let state = { tasks: this.props.tasks,
    //         tasksFilter: 'All',
    //     };
    //     let stateAsString = localStorage.getItem('our-state-'+this.props.id);
    //     if (stateAsString != null) {
    //         state = JSON.parse(stateAsString);
    //     }
    //     this.setState(state)
    // };

    setFilter = (filter) => {
        this.setState({tasksFilter: filter});
    };

    addTask = (text) => {
        let nextTaskId = 1;
        let usedIdArr = this.props.tasks.map(t => t.id);
        usedIdArr.sort((a, b) => a - b);
        for (let i = 0; i < usedIdArr.length; i++) {
            if (usedIdArr[i] === nextTaskId) {
                nextTaskId++;
            } else {
                break;
            }
        }
        let newTask = {
            id: nextTaskId,
            isDone: true,
            taskName: text,
            priority: 'low',
        };
        this.props.addTask(this.props.id, newTask);
    };

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId);
    };

    editTask = (taskId, change, value) => {
        this.props.editTask(this.props.id, taskId, change, value);
    };

    render = () => {

        return (
            <div className={style.todoList}>
                <TodoHeader
                    title={this.props.title}
                    addTask={this.addTask}
                />

                <TodoTasks tasks={
                    this.props.tasks.filter(t => {
                        if (this.state.tasksFilter === 'All')
                            return true;
                        if (this.state.tasksFilter === 'Completed')
                            return t.isDone === true;
                        if (this.state.tasksFilter === 'Active')
                            return t.isDone === false;
                    })}
                           editTask={this.editTask}
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

