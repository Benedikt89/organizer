import React from "react";
import '../../App.css';
import style from './Header.module.css';
import AddNewItemForm from "../AddNewItemForm";


class TodoHeader extends React.Component {

    state = {
        changeStatus: false,
        warning: false,
        currentName: this.props.title,
    };
    changeStatus = () => {
        this.setState({changeStatus: true})
    };

    inputChange = (e) => {
        let newText = e.currentTarget.value;
        if (newText === '') {
            this.setState({currentName: newText, warning: true});
        } else {
            this.setState({currentName: newText, warning: false})
        }
    };

    applyChange = () => {
        if (this.state.currentName !== '') {
            this.props.editTitle(this.props.id, this.state.currentName);
            this.setState({changeStatus: false})
        } else {
            this.setState({warning: true})
        }
    };
    addOnKey = (e) => {
        if (e.key === 'Enter') {
            this.applyChange()
        }
    };

    render = () => {

        let classForWarning = () => this.state.warning ? style.warning : style.taskForm;

        return (
            <div className={style.todoHeader}>
                {!this.state.changeStatus
                    ?<h3 className={style.todoListHeaderTitle} onDoubleClick={this.changeStatus}>{this.props.title}</h3>
                    : <input
                    className={classForWarning()}
                    value={this.state.currentName}
                    onBlur={this.applyChange}
                    autoFocus={true}
                    onChange={this.inputChange}
                    onKeyPress={this.addOnKey}
                    />
                }
                <button onClick={this.props.deleteList}>delete</button>
                <AddNewItemForm addItem={this.props.addTask} />
            </div>
        )
    }
}

export default TodoHeader;