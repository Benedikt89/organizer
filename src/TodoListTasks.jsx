import React from 'react';
import './App.css';
import './TodoListTask';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {

        let tasksElements = this.props.tasks
            .map(task => <TodoListTask
                title={task.title}
                isDone={task.isDone}
                pryority={task.priority}
            />);

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;