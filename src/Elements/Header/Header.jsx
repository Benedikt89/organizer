import React from "react";
import '../../App.css';
import style from './Header.module.css';
import AddNewItemForm from "../AddNewItemForm";


class TodoHeader extends React.Component {


    render = () => {


        let clearStorage = () => {
            this.props.clearStorage();
        };

        return (
            <div className={style.todoHeader}>
                <h3 className={style.todoListHeaderTitle}>{this.props.title}</h3>
                <AddNewItemForm addItem={this.props.addTask} />
                <button onClick={clearStorage}>Clear All</button>
            </div>
        )
    }
}

export default TodoHeader;