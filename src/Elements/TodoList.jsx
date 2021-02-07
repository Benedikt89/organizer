import React from 'react';
import style from './TodoList.module.css';
import TodoHeader from "./Header/Header";
import TodoFooter from "./Footer/Footer";
import TodoTasks from "./Tasks/TodoTasks";
import {connect} from "react-redux";
import {addTask, deleteList, deleteTask, editTask, getTasks, editTitle} from "../Redux/reducers";


class TodoList extends React.Component {

    state = {
        tasks: this.props.tasks,
        tasksFilter: 'All',
    };

    componentDidMount() {
        this.props.getTasks(this.props.id);
    }

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
        this.props.addTask(this.props.id, text);
    };

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId);
    };

    editTask = (taskId, change) => {
        let newTask = this.props.tasks.find(t=> t.id === taskId);
        newTask = {...newTask, ...change};
        this.props.editTask(this.props.id, newTask);
    };

    render = () => {
        let tasks = this.props.tasks ? this.props.tasks : [];
        return (
            <div className={style.todoList}>
                <TodoHeader
                    title={this.props.title}
                    id={this.props.id}
                    addTask={this.addTask}
                    editTitle={this.props.editTitle}
                    deleteList={()=>{this.props.deleteList(this.props.id)}}
                />

                <TodoTasks tasks={
                    tasks.filter(t => {
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
const ConnectedList = connect(null, {addTask, deleteList, deleteTask, editTask, getTasks, editTitle})(TodoList);
export default ConnectedList;

