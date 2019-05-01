import React from 'react';

class WowBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.scrollEvent = this.scrollEvent.bind(this);
  }

  componentDidMount() {
    if (!this.isScrolledIntoView(this.refs.scoreRef)) {
      window.addEventListener('scroll', this.scrollEvent);
    } else {
      this.setState(() => ({ show: true }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollEvent);
  }

  scrollEvent() {
    if (this.state.show) return;
    if (!this.isScrolledIntoView) return;

    if (this.isScrolledIntoView(this.refs.scoreRef)) {
      this.setState(() => ({ show: true }));
      window.removeEventListener('scroll', this.scrollEvent);
    }
  }

  isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;

    // Only completely visible elements return true:
    const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
    // Partially visible elements return true:
    // isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }

  render() {
    const slideDistance = 20;
    const wrapper = {
      display: 'inline-block',
      width: '100%',
      transition: 'all .6s ease-in-out',
      opacity: 0,
      transform: `translateX(${slideDistance}px)`,
    };
    const wowType = this.props.slide || 'none';
    switch (true) {
      case wowType == 'up':
        wrapper.transform = `translateY(${slideDistance}px)`;
        break;
      case wowType == 'left':
        wrapper.transform = `translateX(${slideDistance}px)`;
        break;
      case wowType == 'down':
        wrapper.transform = `translateY(-${slideDistance}px)`;
        break;
      case wowType == 'right':
        wrapper.transform = `translateX(-${slideDistance}px)`;
        break;
      default:
        wrapper.transform = '';
        break;
    }

    if (this.state.show) {
      wrapper.transform = 'translateX(0)';
      wrapper.opacity = '1';
    }
    return (
      <div style={wrapper} ref="scoreRef">
        {this.props.children}
      </div>
    );
  }
}

export default WowBlock;
