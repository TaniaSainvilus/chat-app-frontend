import React from 'react';
import config from '../../config.js';
import io from 'socket.io-client';

// import './App.css';
let baseUrl;
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003/';
} else {
  //TODO ADD HEROKUAPP URL
  baseUrl = 'herokupapp url';
}
console.log(baseUrl);

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: [],
      content: '',
      input: '',
      isVisible:false
    };
    this.handleContent = this.handleContent.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.msgDelete = this.msgDelete.bind(this);
    this.msgEdit = this.msgEdit.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
  }

  componentDidMount() {
    this.socket = io(config[process.env.NODE_ENV].endpoint);

    // Load the last 10 messages in the window. v
    this.socket.on('init', (msg) => {
      let msgReversed = msg.reverse();
      this.setState((state) => ({
        chat: [...state.chat, ...msgReversed],
      }), this.scrollToBottom);
    });
    


    // Update the chat if a new message is broadcasted.
    this.socket.on('push', (msg) => {
      this.setState((state) => ({
        chat: [...state.chat, msg],
      }), this.scrollToBottom);
    });
  }

  // Save the message the user is typing in the input field.
  handleContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  handleInput(event) {
    this.setState({
      input: event.target.value,
    });
  }

  // When the user is posting a new message.
  handleSubmit(event) {
    console.log(event);

    // Prevent the form to reload the current page.
    event.preventDefault();
    fetch(baseUrl + 'chats/', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.props.name,
        content: this.state.content
      })
    })
    .then(res => res.json(
      )).then(data => {
        this.socket.emit('message', data);
    
        this.setState((state) => {
          // Update the chat with the user's message and remove the current message.
          return {
            chat: [...state.chat, data],
            content: ''
          };
        }, this.scrollToBottom);
      });
    // Send the new message to the server.
  }

  msgDelete(id) {
    fetch(baseUrl + "chats/" + id, {
      method: "DELETE",
    }).then(res => {
      const findIndex = this.state.chat.findIndex(chat => chat._id === id);
      const copyChat = [...this.state.chat];
      copyChat.splice(findIndex, 1);
      this.setState({chat: copyChat});
    })
  } 

  msgEdit(event, id) {
    event.preventDefault(); //event.target.value
    
    fetch(baseUrl + 'chats/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        _if: id,
        name: this.props.name,
        content: this.state.input
      }),
      headers: {
      'Content-Type': 'application/json',
      },
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log(data)
      let copyChat = [...this.state.chat];
      let findIndex = this.state.chat.findIndex(chat => chat._id === id);
      copyChat[findIndex] = data;
      this.setState({chat: copyChat})
    });
  } 

  toggleInput(cont) {
    this.setState(prevState => ({ isVisible: !prevState.isVisible }));
    this.setState({input: cont})
  }


  // Always make sure the window is scrolled down to the last message.
  scrollToBottom() {
    const chat = document.getElementById('chat-box');
    chat.scrollTop = chat.scrollHeight;
  }

  render() {
    const { isVisible } = this.state;

    return (
      <div className="chat">
        <div id="chat-box" elevation={3}>
          {this.state.chat.map((el, index) => {
            return (
              <>
                <div className="chat-bubble" key={el._id}>
                  {index > 0 && el.name === this.state.chat[index-1].name ?
                  (<></>) : 
                  (<div variant="caption" className="name">
                    {el.name}
                  </div>)}   
                  <div variant="body1" className="content">
                    {el.content}
                  </div>
                  {el.name === this.props.name ?
                  (<div className="icon-btns">
                    <i className="fas fa-trash-alt" onClick={()=> this.msgDelete(el._id)}></i>
                    <i className="fas fa-edit" onClick={() => this.toggleInput(el.content)}></i>
                    <form id="editor" className={isVisible ? "" : "hidden-input"} onSubmit={(evt)=> this.msgEdit(evt, el._id)}>
                        <input  
                          onChange={this.handleInput}
                          value={this.state.input} 
                          type="text" id="msg-edit" name="msg-edit"/>
                      </form>
                  </div>) :
                  (<></>)} 
                </div> <br/>
              </>
            );
          })}
        </div>
        <div id="msg-bar">
          <div id="msg-bar-name">
            {this.props.name}
          </div>
          <div id="msg-bar-input">
            <form onSubmit={this.handleSubmit}>
              <input 
                onChange={this.handleContent} 
                value={this.state.content} 
                placeholder="Type your message..."
                type="text" id="msg" name="msg"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Chat;