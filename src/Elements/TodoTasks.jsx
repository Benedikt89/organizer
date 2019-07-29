
import React from "react";
import './../App.css';
import TodoTask from "./TodoTask";



class TodoTasks extends React.Component {

    render = () => {


        let tasksO = this.props.tasks.map( task =>
            <TodoTask taskName={task.taskName}
                      ifChecked={task.ifChecked}
                      priority={task.priority}
            />
        );


        return(
            <div className="todoListTasks">
                {tasksO}
            </div>
        )
    }
}

export default TodoTasks;