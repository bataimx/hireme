/**
 * Portfolio page
 * This page show about skill
 */

import React from 'react';
import styled from 'styled-components';

import TextBlock from './TextBlock';
import ScoreBlock from './ScoreBlock';
import Matrix from './Matrix';
import Careers from './Careers';
import Footer from './Footer';
import WowBlock from './WowBlock';
import A from 'components/A';
import H1 from 'components/H1';
import H3 from 'components/H3';
import Img from 'components/Img';
import Thumb1 from './Thumbs/thumb1.jpg';

const appHeight = 6000;
const AppWrapper = styled.div`
  margin: 0 auto;
  display: inline-block;
  min-height: ${appHeight}px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      threeloader: false
    }
    this.animationID = null;
    this.RefTextBlock = React.createRef();
    this.RefMatrix = React.createRef();
    
    this.componentsToUpdate = [this.RefTextBlock, this.RefMatrix];
  }
  
  componentDidMount() {
    const scope = this;
    this.animationID = window.requestAnimationFrame(() => this.update());
    if( window.THREE ) {
      this.setState( state => ({ threeloader: true }))
    }
    document.getElementById('threeloader').addEventListener('load', function() {
      scope.setState( state => ({ threeloader: true }))
    });
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationID);
  }

  update() {
    const scope = this;
    this.componentsToUpdate.map(component => {
      if(!component.current) return;
      component.current.update()
    });
    this.setState( state => ({ percent: scope.getScrollPercent() }))
    this.animationID = window.requestAnimationFrame(() => this.update());  
  }
  
  getScrollPercent() {
    let scrollHeight = appHeight;// document.body.clientHeight;
    return (
      (window.pageYOffset / (scrollHeight - window.innerHeight)) * 100
    );
  }

  render() {
    const percent = this.state.percent;
    let message = null;
    switch (true) {
      case (percent < 12):
        message = 'Hello! I\'m Tai.';
        break;
      case (percent < 60):
        message = 'I\'m a Frontend Web Developer.'
        break;
      case (percent < 80):
        message = 'I love <code/> beautiful projects.';
        break;
      case (percent < 100):
        message = '#givemechallenge';
        break;
      case (percent < 106):
        message = ' ';
        break;
      default:
        break;
    }

    return <div>
      <AppWrapper>
        { message ?
          <TextBlock
            ref={ this.RefTextBlock }
            duration={0.2}
            text={ message } />
          : null
        }
        { this.state.threeloader && this.state.percent <= 100 ? <Matrix getScrollPercent={this.getScrollPercent} ref={ this.RefMatrix } /> : <b>Loading</b> }
      </AppWrapper>

      <div className="container-fluid" style={{background: '#dbefff', padding: '10rem 4rem'}}>
        <div className="row justify-content-center">
          <div className="col-sm-10 col-lg-6 text-sm-center">
            <WowBlock slide="down">
              <H1>About me</H1>
            </WowBlock>
            <WowBlock slide="left">
              <p>I'm a web developer with 5 year exp working as Frontender,
                now i'm working for a Japanese company. I fairly well-versed in build up
                responsive website that friendly and stand out.</p>
            </WowBlock>
            <WowBlock slide="up">
              <H3>
                <A
                  target="_blank"
                  href="https://drive.google.com/open?id=0BylCAo5UYnpVWnVwaFFLSE5wOUU" >
                  Hire Me!
                </A>
              </H3>
            </WowBlock>
          </div>
        </div>
      </div>

      <div className="container-fluid" style={{background: '#fff', padding: '4rem'}}>
        <div className="row">
          <div className="col-sm col-lg-4 offset-lg-1 mb-4 mb-lg-0">
            <WowBlock slide="right">
              <Img className="img-fluid" src={Thumb1} alt="thumb1" />
            </WowBlock>
          </div>
          <div className="col-sm col-lg-4 offset-lg-1">
            <WowBlock slide="right">
              <H3>My SKills & Knowledge</H3>
            </WowBlock>
            <ScoreBlock percent={.9} >HTML</ScoreBlock>
            <ScoreBlock percent={.9} >CSS</ScoreBlock>
            <ScoreBlock percent={.8} >Javascript</ScoreBlock>
            <ScoreBlock percent={.8} >Responsive Web</ScoreBlock>
            <ScoreBlock percent={.7} >Git & SVN</ScoreBlock>
            <WowBlock slide="up">
              <ul className="list-inline my-4" style={{color: '#72a6d0'}}>
                <li className="list-inline-item pr-3"><i className="fab fa-3x fa-html5"></i></li>
                <li className="list-inline-item pr-3"><i className="fab fa-3x fa-css3"></i></li>
                <li className="list-inline-item pr-3"><i className="fab fa-3x fa-js"></i></li>
                <li className="list-inline-item pr-3"><i className="fab fa-3x fa-gulp"></i></li>
                <li className="list-inline-item pr-3"><i className="fab fa-3x fa-grunt"></i></li>
                <li className="list-inline-item pr-3"><i className="fab fa-3x fa-sass"></i></li>
                <li className="list-inline-item pr-3"><i className="fab fa-3x fa-node-js"></i></li>
                <li className="list-inline-item pr-3"><i className="fab fa-3x fa-joomla"></i></li>
                <li className="list-inline-item pr-3"><i className="fab fa-3x fa-php"></i></li>
                <li className="list-inline-item pr-3"><i className="fab fa-3x fa-react"></i></li>
                <li className="list-inline-item pr-3"><i className="fab fa-3x fa-wordpress"></i></li>
              </ul>
            </WowBlock>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5" style={{background: '#dbefff'}}>
        <div className="row align-items-center">
          <div className="col-lg-4 mb-4 mb-lg-0 text-lg-right">
            <WowBlock slide="up">
              <H1>Find Me at</H1>
            </WowBlock>
          </div>
          <div className="col-lg-6 offset-lg-2">
            <WowBlock slide="up">
              <ul className="list-unstyled row mb-0">
                <li className="col-sm col-4" >
                  <A target="_blank" href="https://codepen.io/bataimx/">
                    <i className="fab fa-3x fa-codepen"></i>
                    <p>Codepen</p>
                  </A>
                </li>
                <li className="col-sm col-4" >
                  <A target="_blank" href="skype:bataimx@hotmail.com">
                    <i className="fab fa-3x fa-skype"></i>
                    <p>Skype</p>
                  </A>
                </li>
                <li className="col-sm col-4" >
                  <A target="_blank" href="https://www.linkedin.com/in/bataimx/">
                    <i className="fab fa-3x fa-linkedin"></i>
                    <p>Linkedin</p>
                  </A>
                </li>
                <li className="col-sm col-4" >
                  <A target="_blank" href="https://github.com/bataimx/">
                    <i className="fab fa-3x fa-github"></i>
                    <p>Github</p>
                  </A>
                </li>
                <li className="col-sm col-4" >
                  <A target="_blank" href="https://www.hackerrank.com/bataimx/">
                    <i className="fab fa-3x fa-hackerrank"></i>
                    <p>Hackerrank</p>
                  </A>
                </li>
              </ul>
            </WowBlock>
          </div>
        </div>
      </div>

      <Careers/>
      <Footer/>

    </div>;
  }
}

export default App;