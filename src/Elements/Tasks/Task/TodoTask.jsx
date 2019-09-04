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
            this.setState({currentName: this.props.task.title, changeStatus: true})
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
                this.props.taskTitleEdit(this.props.task.id, this.state.currentName);
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
        let classIsDone = () => this.props.task.isDone ? style.asd : style.asdf;
        let classForWarning = () => this.state.warning ? style.warning : style.taskForm;
        let deleteTask = () => {
            this.props.deleteTask(this.props.task.id)
        };

        let onChangeBox = (e) => {
            this.props.isDoneChanger(this.props.task.id, e.currentTarget.checked);
        };
        let priority = () => {
            switch (this.props.task.priority) {
                case 0: return 'low';
                case 1: return 'middle';
                case 2: return 'hi';
                case 3: return 'Urgently';
                case 4: return 'Later';
                default: return 'none';
            }
        };

        return (
            <div className={style.task}>
                <input type="checkbox"
                       checked={this.props.task.isDone}
                       onClick={onChangeBox}
                       className={style.container}
                />
                {!this.state.changeStatus ?
                    <span
                        className={style.taskContent}
                    onClick={taskChanger}
                >{this.props.task.title}</span>
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
                <span> {priority()}.</span>
                <button
                    className={style.deleteBtn}
                    onClick={deleteTask}
                >X</button>
            </div>
        )
    }

}


export default TodoTask;