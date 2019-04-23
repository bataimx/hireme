import React from 'react';

class ScoreBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      show: false
    }
    this.scrollEvent = this.scrollEvent.bind(this);
  }

  componentDidMount() {
    if( !this.isScrolledIntoView(this.refs.scoreRef) ) {
      window.addEventListener("scroll", this.scrollEvent );
    } else {
      this.setState( () => ({ show: true }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollEvent );
  }

  scrollEvent() {
    if(this.state.show) return;
    if(!this.isScrolledIntoView) return;

    if( this.isScrolledIntoView(this.refs.scoreRef) ) {
      this.setState( () => ({ show: true }));
      window.removeEventListener("scroll", this.scrollEvent );
    }
  }

  isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top + (window.innerHeight /3);
    const elemBottom = rect.bottom + (window.innerHeight /3);

    // Only completely visible elements return true:
    const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }

  render() {
    let wrapper = {
      display: 'inline-block',
      width: '100%',
      textAlign: 'left'
    }
    let styles = {
      backgroundColor: '#dbefff',
      height: '30px',
      lineHeight: '20px',
      padding: '5px 0',
      margin: '5px 0',
      fontSize: '14px',
      color: '#000',
      float: 'left',
      transition: 'all 1s ease-in-out',
      overflow: 'hidden'
    }
    if(this.state.show) {
      styles.width = `${this.props.percent * 100}%`;
    } else {
      styles.width = `0%`;
    }
    return <div style={wrapper} ref="scoreRef" >
      <div style={styles} >
        <span style={{padding: '0 5px'}}>{this.props.children}</span>
        <span style={{float: 'right', padding: '0 5px'}}>{`${this.props.percent * 100}%`}</span>
      </div>
    </div>;
  }
}

export default ScoreBlock;