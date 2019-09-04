import React from 'react';
import './App.css';
import TodoList from "./Elements/TodoList";
import AddNewItemForm from "./Elements/AddNewItemForm";
import axios from "axios";
import instance from "./api";


class App extends React.Component {


    componentDidMount() {
        this.restoreState();
    }

    state = {
        todolists: [],
    };

    nextListId = 1;
    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-lists', stateAsString);
    };

    // _restoreState = () => {
    //     let state = {
    //         todolists: [
    //             {
    //                 idL: 1,
    //                 title: 'asd'
    //             },
    //             {
    //                 idL: 2,
    //                 title: 'asdfg2'
    //             },
    //         ],
    //     };
    //     let stateAsString = localStorage.getItem('our-lists');
    //     if (stateAsString != null) {
    //         state = JSON.parse(stateAsString);
    //     }
    //     this.setState(state);
    //     console.log(this.nextListId);
    //     {
    //         let usedIdArr = this.state.todolists.map( t=> t.idL);
    //         usedIdArr.sort((a, b) => a - b );
    //
    //         for ( let i = 0; i < usedIdArr.length; i++) {
    //             if (usedIdArr[i] === this.nextListId) {
    //                 this.nextListId++;
    //             } else {break;}
    //         }
    //         let newList = {
    //             idL: this.nextListId,
    //             title: title,
    //         };
    //         let newLists = [... this.state.todolists, newList];
    //         this.setState({todolists: newLists}, ()=> { this.saveState(); });
    //         this.nextListId = 1;
    //     }
    // };


    restoreState = () => {
        let state = this.state;
        instance.get("todo-lists")
            .then(res=> {
                this.setState({todolists: res.data})
            })
    };

    addList = (title) => {
        instance.post("todo-lists", {title: title})
            .then(res => {
                let todolist = res.data.data.item; //todolist, котоырй создался на серваке и вернулся нам
                this.setState({todolists: [...this.state.todolists, todolist]})
            });
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

