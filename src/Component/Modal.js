import React from "react";
import FocusLock from "react-focus-lock"; //used this and not 'focus-trap' because its not emulating the browser tab behavior
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import "./StyleModal.css";

const Modal = props => {
  const handleKeyUp = e => {
    if (e.keyCode === 27) {
      e.preventDefault();
      handleCloseModal();
    }
  };
  const handleClick = e => {
    if (this.modalContent && !this.modalContent.contains(e.target)) {
      handleCloseModal();
    }
  };

  //run on open
  (function() {
    console.log(props);
    if (props.isOpen) {
      window.addEventListener("keyup", handleKeyUp, false);
      document.addEventListener("click", handleClick, false);
    }
  })();

  const handleCloseModal = () => {
    window.removeEventListener("keyup", handleKeyUp, false);
    document.removeEventListener("click", handleClick, false);
    props.onClose(props.id);
  };

  const checkAndRenderTransition = () => {
      if(props.isOpen){

          if('transition' in props && props.transition){
              return (
                  
                      <ReactCSSTransitionGroup
                      transitionName={props.transition}
                      transitionAppear={true}
                      transitionAppearTimeout={200}
                      transitionEnterTimeout={200}
                      transitionLeaveTimeout={200}
                      >
                              {renderModal()}
                      </ReactCSSTransitionGroup>
              )
          }
          else {
              return (renderModal())
          }  
      }
  }

  const renderModal = () => {

      return (
          <div>
                <div
                className={props.defaultStyle ? "modal-overlay" : null}
                style={"style" in props && "overlay" in props.style? props.style.overlay: null
                }
                />
                <div role="dialog">
                    <FocusLock>
                        <div
                        role="document"
                        ref={node => {this.modalContent = node;}}
                        className={props.defaultStyle ? "modal-contnet" : null}
                        style={"style" in props && "content" in props.style? props.style.content: null
                        }
                        >
                        {props.children}
                        </div>
                    </FocusLock>
                </div>
        </div>
      );
    }
  

  return <section>{checkAndRenderTransition()}</section>;
};
export default Modal;
