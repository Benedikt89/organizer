import React from "react";
import '../../App.css';
import style from './TodoFooter.module.css';

class TodoFooter extends React.Component {

    state ={
        isHidden: false,
    };

    render = () => {

        let classForAll = this.props.filterValue === 'All' ? style.active : style.button;
        let classForCompleted = this.props.filterValue === 'Completed' ? style.active : style.button;
        let classForActive = this.props.filterValue === 'Active' ? style.active : style.button;

    return(

        <div className="todoList-footer">
            {!this.state.isHidden &&
            <div>
                <button
                    className={style.button}
                    onClick={()=> {this.setState({isHidden:true})}}
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
            {this.state.isHidden &&
            <button
                className={style.button}
                onClick={() => {this.setState({isHidden:false})
                }}
            >Show</button>
            }
        </div>

    )
    }

}

export default TodoFooter;