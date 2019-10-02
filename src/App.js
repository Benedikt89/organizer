import React from 'react';
import './App.css';
import TodoList from "./Elements/TodoList";
import AddNewItemForm from "./Elements/AddNewItemForm";
import {connect} from "react-redux";
import {addList, deleteList, getLists} from "./Redux/reducers";


class App extends React.Component {

    componentDidMount() {
        this.props.getLists();
    }

    addList = (text) => {
        this.props.addList(text);
    };

    render = () => {
        const todolists = this.props.todolists.map( tl =>
            <TodoList
                id={tl.id}
                title={tl.title}
                tasks={tl.tasks}
                tasksFilter={tl.tasksFilter}
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
        todolists: state.reducer.todolists,
    }
};

const ConnectedApp = connect(mapStateToProps, {getLists, addList, deleteList})(App);
export default ConnectedApp;