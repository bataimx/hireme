import React from 'react';

const styles = {
  position: 'fixed',
  top: '0',
  left: '4rem',
  bottom: '0',
  height: '150px',
  textAlign: 'left',
  margin: 'auto',
  zIndex: '9',
  fontWeight: 'bold',
  fontSize: '40px',
  color: '#252525',
  maxWidth: 'calc(100% - 4rem)',
  textShadow: '0px 5px 6px #a7a7a7'
}

class TextBlock extends React.Component {
  constructor(props) {
    super(props);
    this.animationID = null;
    this.state = {
      complete: false,
      isRemove: false,
      preText: this.props.text,
      currentTime: 0,
      idx: 0
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if( this.props.text != nextProps.text ) {
      nextState.complete = false;
      nextState.isRemove = true;
      nextState.currentTime = 0;
    }
    
    if( this.state.isRemove != nextState.isRemove ) {
      nextState.preText = nextProps.text;
      nextState.currentTime = 0;
    }
    return true;
  }
  
  update() {
    if( this.state.complete ) return;

    let start = 0,
        end = this.state.preText.length - 1,
        duration = this.props.duration || 2,
        speed = this.state.isRemove ? 2 : this.props.speed || 1;

    let nextIDx = this.easeInCubic(this.state.currentTime, start, end, duration),
        isComplete = this.isComplete(this.state, this.props);

    if( this.state.isRemove ) {
      nextIDx = end - nextIDx;
    }
    window.debug = this.state;
 
    this.setState( state => ({
      isRemove: (state.isRemove && state.idx <= 0) ? false : state.isRemove,
      complete: isComplete,
      currentTime: state.currentTime + (speed/100),
      idx: nextIDx
    }));
  }

  isComplete(state, props) {
    if( !state.isRemove )
      return state.idx < props.text.length ? false : true
    else
      return false
  }

  easeInCubic(t, b, c, d) {
    t = t / d;
    return c*t*t*t + b;
  };

  render() {
    const msg = this.state.isRemove ? this.state.preText : this.props.text;
    const txt = [...msg].filter( (letter, idx) => idx <= (this.state.idx - 1) );
    return <div style={styles} className="head-text" >{txt}<span className="typed-cursor" >|</span></div>;
  }
}

export default TextBlock;