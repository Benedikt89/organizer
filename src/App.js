import React from 'react';
import './App.css';
import TodoHeader from "./Elements/Header";
import TodoFooter from "./Elements/Footer";
import TodoTasks from "./Elements/TodoTasks";


class App extends React.Component {

    tasks = [
        {
            ifChecked: true,
            taskName: 'JS',
            priority: 'medium',
        },

        {
            ifChecked: false,
            taskName: 'React',
            priority: 'high',
        },

        {
            ifChecked: true,
            taskName: 'Css',
            priority: 'medium',
        },

        {
            ifChecked: true,
            taskName: 'THML',
            priority: 'low',
        },
    ];

    render = () => {


        return (
            <div className="App">
                <div className="todoList">
                    <TodoHeader/>
                    <TodoTasks tasks={this.tasks}/>
                    <TodoFooter filterValue={'Active'}/>
                </div>
            </div>
        );

    }
}

export default App;

