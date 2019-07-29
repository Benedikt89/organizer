import React from "react";
import './../App.css';


class TodoTask extends React.Component {
    render = () => {
        return (
            <div className="todoList-task">
                <input type="checkbox" checked={this.props.ifChecked}/>
                <span>{this.props.taskName}, priority: {this.props.priority}.</span>
            </div>
        )
    }

}


export default TodoTask;