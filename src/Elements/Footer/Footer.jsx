import React from "react";
import '../../App.css';
import style from './TodoFooter.module.css';

class TodoFooter extends React.Component {

    state ={
        isHidden: false,
    };

    render = () => {

        let classForAll = this.props.filterValue === 'All' ? style.active : '';
        let classForCompleted = this.props.filterValue === 'Completed' ? style.active : '';
        let classForActive = this.props.filterValue === 'Active' ? style.active : '';

    return(

        <div className="todoList-footer">
            {this.state.isHidden &&
            <div>
                <button
                    className={style.button}
                    onClick={()=> {this.setState({isHidden:false})}}
                >Hide</button>

                <button
                    onClick={() => {this.props.setFilter('All')}}
                    className={classForAll}
                >All</button>

                <button
                className={classForCompleted}
                onClick={()=> {this.props.setFilter('Completed')}}
                >Completed</button>

                <button
                className={classForActive}
                onClick={() => {this.props.setFilter('Active')}}
                >Active</button>

            </div>
            }
            {!this.state.isHidden &&
            <button
                className={style.button}
                onClick={() => {this.setState({isHidden:true})
                }}
            >Show</button>
            }
        </div>

    )
    }

}

export default TodoFooter;