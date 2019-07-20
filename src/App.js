import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoFooter";

class App extends React.Component {
    render = () => {
        return (
            <div className="App">
                <div className="todoList">

                    <TodoListTasks/>
                    <TodoListFooter/>
                    <TodoListHeader/>

                </div>
            </div>
        );
    }
}

export default App;

