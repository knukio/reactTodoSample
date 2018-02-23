import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      todoList: ['test1', 'test2'],
      value: 'タスクを入力',
      errorMessage: ''
    }
    this.errorMessage = {
      none: '',
      blank: '文字を入力してください' ,
      duplicate: 'すでに存在します'
    }
    console.log(this.state.todoList)
  }


  addItem(e) {
    if(!this.checkIllegalInput()){
      this.setState({todoList: this.state.todoList.concat(this.state.value)})
      this.setState({value: ''})
    }
  }

  deleteItem(todo, e) {
    this.setState({todoList: this.state.todoList.filter(_todo => _todo !== todo)})
  }

  checkIllegalInput() {
    if(this.state.todoList.includes(this.state.value)){
      this.setState({errorMessage: this.errorMessage.duplicate})
      return true
    } else if(!this.state.value.match(/\S/g) || this.state.value === null ){
      this.setState({errorMessage: this.errorMessage.blank})
      return true
    } else {
      this.setState({errorMessage: this.errorMessage.none})
      return false
    }
  }

  changeText(e) {
    const value = ReactDOM.findDOMNode(e.target).value
    this.setState({value: value}, this.checkIllegalInput)
  }

  onKeyDown(e) {
    if(e.keyCode === 13){ // enter
      this.addItem(e)
    }
  }

  render() {
    return (
      <div className="App">
        <TodoCreator addItem={this.addItem.bind(this)}
                     changeText={this.changeText.bind(this)}
                     value={this.state.value}
                     errorMessage={this.state.errorMessage}
                     onKeyDown={this.onKeyDown.bind(this)}
                     />
        <TodoList todoList={this.state.todoList}
                  deleteItem={this.deleteItem.bind(this)}
                  />
      </div>
    );
  }
}

const TodoCreator = (props) => {
  return (
    <div>
      <span className='error_message'>{props.errorMessage}</span>
      <br/>
      <input value={props.value} onChange={props.changeText} onKeyDown={props.onKeyDown}></input>
      <button onClick={props.addItem}>追加</button>
    </div>
  );
}

const TodoList = (props) => {
  return (
    <ul>
      {props.todoList.map((todo, i) => {
        return (
          <li key={i}><button onClick={props.deleteItem.bind(this, todo)}>削除</button> {todo}</li>
        )
      })}
    </ul>
  );
}

export default App;
