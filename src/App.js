import React from 'react';
import './App.css';
import TodoList from "./Elements/TodoList";
import AddNewItemForm from "./Elements/AddNewItemForm";
import {connect} from "react-redux";
import {addList, addTask, deleteList, deleteTask, editTask} from "./Redux/Store";


class App extends React.Component {

    nextListId = 1;
    addList = (text) => {
        let usedIdArr = this.state.todolists.map( t=> t.id);
        usedIdArr.sort((a, b) => a - b );

        for ( let i = 0; i < usedIdArr.length; i++) {
            if (usedIdArr[i] === this.nextListId) {
                this.nextListId++;
            } else {break;}
        }
        let newList = {
            id: this.nextListId,
            title: text,
            tasks: [],
            tasksFilter: 'All',
        };
        this.props.addList(newList);
        this.nextListId = 1;
    };

    render = () => {
        const todolists = this.props.todolists.map( tl =>
            <TodoList
                id={tl.id}
                title={tl.title}
                tasks={tl.tasks}
                tasksFilter={tl.tasksFilter}
                deleteTask={this.props.deleteTask}
                addTask={this.props.addTask}
                editTask={this.props.editTask}
            />
        );
        return (
            <div className="App">

                <AddNewItemForm className="formNewList" addItem={this.addList}/>
                <div className="lists">
                    {todolists}
                </div>

            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        todolists: state.todolists,
    }
};

const ConnectedApp = connect(mapStateToProps, {addList, addTask, deleteList, deleteTask, editTask})(App);
export default ConnectedApp;