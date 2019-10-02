import React from "react";
import style from './TodoTask.module.css';


class TodoTask extends React.Component {

    state = {
        changeStatus: false,
        warning: false,
        currentName: this.props.task.title,
    };

    render = () => {

        let taskChanger = () => {
            this.setState({currentName: this.props.task.title, changeStatus: true})
        };

        let inputChange = (e) => {
            let newText = e.currentTarget.value;
            if (newText === '') {
                this.setState({currentName: newText, warning: true});
            } else {
                this.setState({currentName: newText, warning: false})
            }
        };

        let addButton = () => {
            if (this.state.currentName !== '') {
                this.props.editTask(this.props.task.id, {title: this.state.currentName});
                this.setState({changeStatus: false})
            } else {
                this.setState({warning: true})
            }
        };

        let addOnKey = (e) => {
            if (e.key === 'Enter') {
                addButton()
            }
        };
        let classForWarning = () => this.state.warning ? style.warning : style.taskForm;

        let deleteTask = () => {
            this.props.deleteTask(this.props.task.id)
        };

        let onChangeBox = (e) => {
            this.props.editTask(this.props.task.id, {completed: e.currentTarget.checked});
        };
        return (
            <div className={this.props.task.completed ? style.task : style.completed}>
                <input type="checkbox"
                       checked={this.props.task.completed}
                       onClick={onChangeBox}
                       className={style.container}
                />
                {!this.state.changeStatus ?
                    <span
                        className={style.taskContent}
                        onClick={taskChanger}
                    >{this.props.task.title}</span>
                    : <input
                        className={classForWarning()}
                        value={this.state.currentName}
                        onBlur={addButton}
                        autoFocus={true}
                        onChange={inputChange}
                        onKeyPress={addOnKey}
                    />
                }
                <span> {this.props.task.priority}.</span>
                <span> status: {this.props.task.status}</span>
                <button
                    className={style.deleteBtn}
                    onClick={deleteTask}
                >X
                </button>
            </div>
        )
    }

}


export default TodoTask;