import React from "react";
import '../../App.css';
import style from './Header.module.css';


class TodoHeader extends React.Component {

    constructor(props) {
        super(props);
        this.newTaskTitle = React.createRef();
    }

    state = {
        warning: false,
        inputArea: '',
    };

    render = () => {

        let inputChange = () => {
            let newText = this.newTaskTitle.current.value;
            if (newText === '') {
                this.setState({inputArea: newText, warning: true});
            } else {
                this.setState({inputArea: newText, warning: false})
            }
        };

        let addButton = () => {
            if (this.state.inputArea !== '') {
                this.props.addTask(this.state.inputArea);
                this.setState({inputArea: ''})
            } else {this.setState({warning: true})}
        };
        let addOnKey = (e) => {
            if (e.key === 'Enter') {
                addButton()
            }
        };

        let classForWarning = () => this.state.warning ? style.warning : style.taskForm;

        return (
            <div className={style.todoHeader}>
                <h3 className={style.todoListHeaderTitle}>What to Learn</h3>
                <div className={style.inputGroup}>
                    <input
                        className={classForWarning()}
                        onChange={inputChange}
                        onKeyPress={addOnKey}
                        ref={this.newTaskTitle}
                        type="text"
                        value={this.state.inputArea}
                        placeholder="New task name"
                    />
                    <button onClick={addButton}>Add</button>
                </div>
            </div>
        )
    }
}

export default TodoHeader;