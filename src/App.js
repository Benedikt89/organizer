import React from 'react';
import './App.css';
import TodoList from "./Elements/TodoList";
import AddNewItemForm from "./Elements/AddNewItemForm";


class App extends React.Component {


    componentDidMount() {
        this.restoreState();
    }

    state = {
        todolists: [
            {
                id: 1,
                title: 'asd'
            },
            {
                id: 2,
                title: 'asdfg2'
            },
        ],
    };
    nextListId = 1;
    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-lists', stateAsString);
    };
    restoreState = () => {
        let state = {
            todolists: [
                {
                    id: 1,
                    title: 'asd'
                },
                {
                    id: 2,
                    title: 'asdfg2'
                },
            ],
        };
        let stateAsString = localStorage.getItem('our-lists');
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state);
        console.log(this.nextListId);
    };

    addList = (text) => {
        let usedIdArr = this.state.todolists.map( t=> t.id);
        usedIdArr.sort((a, b) => a - b );

        for ( let i = 0; i < usedIdArr.length; i++) {
            if (usedIdArr[i] === this.nextListId) {
                this.nextListId++;
            } else {break;}
        }
        let newList = {
            id: this.nextListId,
            title: text,
        };
        let newLists = [... this.state.todolists, newList];
        this.setState({todolists: newLists}, ()=> { this.saveState(); });
        this.nextListId = 1;
    };



    render = () => {


        const todolists = this.state.todolists.map( tl =>
            <TodoList
                id={tl.id}
                title={tl.title}/>
        );
        return (
            <div className="App">

                <AddNewItemForm className="formNewList" addItem={this.addList}/>
                <div className="lists">
                    {todolists}
                </div>

            </div>
        );
    }
}

export default App;

