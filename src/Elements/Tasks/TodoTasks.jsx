
import React from "react";
import '../../App.css';
import TodoTask from "./Task/TodoTask";



class TodoTasks extends React.Component {

    render = () => {


        let tasksO = this.props.tasks.map( task =>
            <TodoTask
                id={task.id}
                task={task}
                deleteTask={this.props.deleteTask}
                editTask={this.props.editTask}
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