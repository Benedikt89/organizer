import React from "react";
import '../../App.css';
import style from './Header.module.css';
import AddNewItemForm from "../AddNewItemForm";


class TodoHeader extends React.Component {

    render = () => {

        return (
            <div className={style.todoHeader}>
                <h3 className={style.todoListHeaderTitle}>{this.props.title}</h3>
                <button onClick={this.props.deleteList}>delete</button>
                <AddNewItemForm addItem={this.props.addTask} />
            </div>
        )
    }
}

export default TodoHeader;