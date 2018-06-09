import React, { Component } from 'react';
import Modal from './Component/Modal'
import './css/App.css';

const customStyles = {
  overlay : {
    backgroundColor: 'rgba(61, 51, 153, 0.719)',
  },
  content : {
    padding : '50px',
    borderRadius : '10px',
  }
};

class App extends Component {
  state = {
    firstModalIsOpen : false,
    secondModalIsOpen : false,
    thirdModalIsOpen : false,
    prvFocusElm : null
  }
  openModal = (modalName) => {

    this.sectionContent.setAttribute("aria-hidden",true)
    this.setState({[modalName] : !this.state[modalName]})
    this.setState({prvFocusElm : document.activeElement})
  }

  closeModal = (modalName) => {

    this.sectionContent.setAttribute("aria-hidden",false)
    this.setState({[modalName] : !this.state[modalName]})
    this.state.prvFocusElm.focus();
  }
 
  render() {
    return (
      <div className="App"> 
        <div className="flex dir-col" ref={node => {this.sectionContent = node}} aria-hidden="false" id="sectionContent">
            <h3>sectionContent</h3>
            <div><button id="btn1" onClick={(e) => this.openModal('firstModalIsOpen',e)} >Open Modal1</button></div>
            <div><button id="btn2" onClick={(e) => this.openModal('secondModalIsOpen',e)} >Open Modal2</button></div>
            <h3>Inputs for tab-check</h3>
            <label>Name:
                  <input type="text"/></label>
            <label>Email:
                  <input type="email"/></label>
            <label>Password:
                  <input type="password"/></label>
        </div>
         

        <Modal 
          id="firstModalIsOpen"        //id must be equal to the state name - in order to support multifply modals
          isOpen={this.state.firstModalIsOpen} 
          onClose={this.closeModal} 
          defaultStyle={true}
          render={(closeCallback) => {
            return (
            <div className="flex dir-col">
              <h3>First Modal Content</h3>
              <label>Name:
                  <input type="text"/> </label>
              <label>Email:
                  <input type="email"/></label>
              <div>
                <button onClick={closeCallback}>Close</button>
              </div>
            </div>  
            )
          }}
          />


        <Modal
        id="secondModalIsOpen"
        isOpen={this.state.secondModalIsOpen} 
        onClose={this.closeModal}
        defaultStyle={true} 
        style={customStyles}
        transition="fade"
        render={(closeCallback) => {
          return(
                  <div className="flex dir-col">
                    <h3>Third Modal Content</h3>
                    <label>Name:
                        <input type="text"/></label>
                    <label>Email:
                        <input type="email"/></label>
                    <label>Password:
                        <input type="password"/></label>
                        <div>
                            <button onClick={closeCallback} >Close</button>
                        </div>
                  </div>
          )
        }}
        />

       
      </div>
    );
  }
}

export default App;
