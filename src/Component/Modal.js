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

  const withTransitionCheck = () => {

    const {transition,isOpen} = props;

      if(isOpen){
          if(transition){
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

    const {style,defaultStyle,render} = props;

      return (
          <div>
                <div
                className={props.defaultStyle ? "modal-overlay" : null}
                style={style && "overlay" in style ? style.overlay : null}
                />
                <div role="dialog">
                    <FocusLock>
                        <div
                        role="document"
                        ref={node => {this.modalContent = node;}}
                        className={defaultStyle ? "modal-contnet" : null}
                        style={style && "content" in style ? style.content : null}
                        >
                           {render(handleCloseModal)}
                        </div>
                    </FocusLock>
                </div>
        </div>
      );
    }
  
  return <section>{(withTransitionCheck())}</section>;
  
};
export default Modal;
