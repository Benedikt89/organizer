import React from "react";
import style from './TodoTask.module.css';


class TodoTask extends React.Component {

    constructor(props) {
        super(props);
        this.newTaskTitle = React.createRef();
    }

    state = {
        changeStatus: false,
        warning: false,
        currentName: '',
    };

    render = () => {

        let taskChanger = () => {
            this.setState({currentName: this.props.task.taskName, changeStatus: true})
        };
        let inputChange = () => {
            let newText = this.newTaskTitle.current.value;
            if (newText === '') {
                this.setState({currentName: newText, warning: true});
            } else {
                this.setState({currentName: newText, warning: false})
            }
        };

        let addButton = () => {
            if (this.state.currentName !== '') {
                this.props.editTask(this.props.task.id, 'title', this.state.currentName);
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
            this.props.editTask(this.props.task.id, 'isDone', e.currentTarget.checked);
        };
        return (
            <div className={this.props.task.isDone ? style.task : style.completed}>
                <input type="checkbox"
                       checked={this.props.task.isDone}
                       onClick={onChangeBox}
                       className={style.container}
                />
                {!this.state.changeStatus ?
                    <span
                        className={style.taskContent}
                        onClick={taskChanger}
                    >{this.props.task.taskName}</span>
                    : <input
                        ref={this.newTaskTitle}
                        className={classForWarning()}
                        value={this.state.currentName}
                        onBlur={addButton}
                        autoFocus={true}
                        onChange={inputChange}
                        onKeyPress={addOnKey}
                    />
                }
                <span> {this.props.task.priority}.</span>
                <span> id: {this.props.task.id}</span>
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