import React from "react";
import './../App.css';
import style from './TodoFooter.module.css';

class TodoFooter extends React.Component {


    render = () => {

        let classForAll = this.props.filterValue === 'All' ? style.active : '';
        let classForCompleted = this.props.filterValue === 'Completed' ? style.active : '';
        let classForActive = this.props.filterValue === 'Active' ? style.active : '';

    return(

        <div className="todoList-footer">
            <button className={classForAll}>All</button>
            <button className={classForCompleted}>Completed</button>
            <button className={classForActive}>Active</button>
        </div>
    )
    }

}

export default TodoFooter;