import React, { Component } from 'react';
import FocusLock from "react-focus-lock"; 
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import "./StyleModal.css";

class Modal extends Component  {

  componentDidUpdate() {
    if (this.props.isOpen) {
      window.addEventListener("keyup", this.handleKeyUp, false);
      document.addEventListener("click", this.handleClick, false);
    }
  }
  handleKeyUp = (e) => {
    if (e.keyCode === 27) {
      e.preventDefault();
      this.handleCloseModal();
    }
  }

  handleClick = e => {
    if (this.modalContent && !this.modalContent.contains(e.target)) {
      this.handleCloseModal();
    }
  }

  handleCloseModal = () => {
    window.removeEventListener("keyup", this.handleKeyUp, false);
    document.removeEventListener("click", this.handleClick, false);
    this.props.onClose(this.props.parentId);
  }

  withTransitionCheck = () => {

    const {transition,isOpen} = this.props;

      if(isOpen){
          if(transition){
              return (
                      <ReactCSSTransitionGroup
                      transitionName={this.props.transition}
                      transitionAppear={true}
                      transitionAppearTimeout={200}
                      transitionEnterTimeout={200}
                      transitionLeaveTimeout={200}>
                              {this.renderModal()}
                      </ReactCSSTransitionGroup>
              )
          }
          else {
              return (this.renderModal())
          }  
      }
  }

  renderModal = () => {
    const {defaultStyle,style,render} = this.props;

      return (
          <div>
                <div className = {(defaultStyle ? "modal-overlay" : null) +
                 (" " + ((style && 'overlay' in style) ?  style.overlay : null))}/>
                <div role="dialog">
                    <FocusLock>
                        <div
                        role="document"
                        ref={node => {this.modalContent = node;}}
                        className = {(defaultStyle ? "modal-contnet" : null) +
                        (" " + ((style && 'contnet' in style) ?  style.contnet : null))}
                        >
                           {render(this.handleCloseModal)}
                        </div>
                    </FocusLock>
                </div>
        </div>
      );
    }
  
    render() {
      return (<section>{(this.withTransitionCheck())}</section>)
    }

};

export default Modal;
