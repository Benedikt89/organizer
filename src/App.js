import React from 'react';
import './App.css';
import TodoHeader from "./Elements/Header/Header";
import TodoFooter from "./Elements/Footer/Footer";
import TodoTasks from "./Elements/Tasks/TodoTasks";


class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    state = {
        tasks: [
            {
                isDone: true,
                taskName: 'JS',
                priority: 'medium',
                id: 0,
            },

            {
                isDone: false,
                taskName: 'React',
                priority: 'high',
                id: 1,
            },

            {
                isDone: true,
                taskName: 'Css',
                priority: 'medium',
                id: 2,
            },

            {
                isDone: true,
                taskName: 'THML',
                priority: 'low',
                id: 3,
            },
        ],
        tasksFilter: 'All',

    };
    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state', stateAsString);
    };
    restoreState = () => {
        let state = { tasks: [
                {
                    isDone: true,
                    taskName: 'JS',
                    priority: 'medium',
                    id: 0,
                },

                {
                    isDone: false,
                    taskName: 'React',
                    priority: 'high',
                    id: 1,
                },

                {
                    isDone: true,
                    taskName: 'Css',
                    priority: 'medium',
                    id: 2,
                },

                {
                    isDone: true,
                    taskName: 'THML',
                    priority: 'low',
                    id: 3,
                },
            ],
            tasksFilter: 'All',
        };
        let stateAsString = localStorage.getItem('our-state');
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state)
    };

    setFilter = (filter) => {
    this.setState({tasksFilter: filter}, ()=> { this.saveState(); });
};
    addTask = (text) => {
        let newTask = {
            isDone: true,
            taskName: text,
            priority: 'low',
            id: this.state.tasks.length + 1,
        };
        let newTasks = [... this.state.tasks, newTask];
        this.setState({tasks: newTasks}, ()=> { this.saveState(); });
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

    render = () => {


        return (
            <div className="App">
                <div className="todoList">
                    <TodoHeader
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
                    />

                    <TodoFooter
                        filterValue={this.state.tasksFilter}
                        setFilter={this.setFilter}
                    />
                </div>
            </div>
        );

    }
}

export default App;

