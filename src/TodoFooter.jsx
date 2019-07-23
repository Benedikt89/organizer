import React from 'react';
import './App.css';
import s from './TodoListFooter.module.css'

class TodoListFooter extends React.Component {
    render = () => {

        let classForAll = this.props.filterValue === "All" ? s.filterActive : "";
        let classForCompleted = this.props.filterValue === "Completed" ? s.filterActive : "";
        let classForActive = this.props.filterValue === "Active" ? s.filterActive : "";

        return (

            <div>
                <button className={classForAll}>All</button>
                <button className={classForCompleted}>Completed</button>
                <button className={s.filterActive}>Active</button>
            </div>

        );
    }
}

export default TodoListFooter;

