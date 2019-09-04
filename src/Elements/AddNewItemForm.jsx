import React from "react";
import style from './AddNewItemForm.module.css';


export default class AddNewItemForm extends React.Component {

    constructor(props) {
        super(props);
        this.newItemTitle = React.createRef();
    }

    state = {
        warning: false,
        inputArea: '',
    };

    render = () => {

        let inputChange = () => {
            let newText = this.newItemTitle.current.value;
            if (newText === '') {
                this.setState({inputArea: newText, warning: true});
            } else {
                this.setState({inputArea: newText, warning: false})
            }
        };

        let addButton = () => {
            let newText=this.state.inputArea;
            if (this.state.inputArea !== '') {
                this.props.addItem(newText);
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

                <div className={style.inputGroup}>
                    <input
                        className={classForWarning()}
                        onChange={inputChange}
                        onKeyPress={addOnKey}
                        ref={this.newItemTitle}
                        type="text"
                        value={this.state.inputArea}
                        placeholder="New task name"
                    />
                    <button onClick={addButton}>Add</button>
                </div>

        )
    }
}