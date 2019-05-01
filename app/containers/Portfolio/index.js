/**
 * Portfolio page
 * This page show about skill
 */

import React from 'react';
import styled from 'styled-components';

import A from 'components/A';
import H1 from 'components/H1';
import H3 from 'components/H3';
import Img from 'components/Img';
import TextBlock from './TextBlock';
import ScoreBlock from './ScoreBlock';
import Matrix from './Matrix';
import Careers from './Careers';
import Footer from './Footer';
import WowBlock from './WowBlock';
import Thumb1 from './Thumbs/thumb1.jpg';

const appHeight = 7000;
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
      threeloader: false,
      delta: 0,
    };
    this.animationID = null;
    this.RefTextBlock = React.createRef();
    this.RefMatrix = React.createRef();

    this.componentsToUpdate = [this.RefTextBlock, this.RefMatrix];
  }

  componentDidMount() {
    const scope = this;
    this.animationID = window.requestAnimationFrame(() => this.update());
    if (window.THREE) {
      this.setState(() => ({ threeloader: true }));
    }

    document.getElementById('threeloader').addEventListener('load', function() {
      scope.setState(() => ({ threeloader: true }));
    });
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationID);
  }

  update() {
    const scope = this;
    this.componentsToUpdate.map(component => {
      // if (!component.current) return;
      component.current.update();
    });
    this.setState(state => ({
      percent: scope.getScrollPercent(),
      delta: state.delta + 0.1,
    }));
    this.animationID = window.requestAnimationFrame(() => this.update());
  }

  getScrollPercent() {
    const scrollHeight = appHeight; // document.body.clientHeight;
    return (window.pageYOffset / (scrollHeight - window.innerHeight)) * 100;
  }

  render() {
    const { percent } = this.state;
    let message = null;
    switch (true) {
      case percent < 12:
        message = "Hello! I'm Tai.";
        break;
      case percent < 60:
        message = "I'm a Frontend Web Developer.";
        break;
      case percent < 80:
        message = 'I love <code/> beautiful projects.';
        break;
      case percent < 100:
        message = '#givemechallenge';
        break;
      case percent < 105:
        message = ' ';
        break;
      default:
        break;
    }

    if (this.state.delta >= 8 && !this.isScroll && window.scrollY < 400) {
      window.scrollTo(0, 400);
      this.isScroll = true;
    }

    return (
      <div>
        <AppWrapper>
          {message ? (
            <TextBlock
              ref={this.RefTextBlock}
              duration={percent < 12 ? 0.5 : 0.2}
              text={message}
            />
          ) : null}
          {this.state.threeloader && this.state.percent <= 100 ? (
            <Matrix
              getScrollPercent={this.getScrollPercent}
              ref={this.RefMatrix}
            />
          ) : (
            <b>Loading</b>
          )}
        </AppWrapper>

        <div
          className="container-fluid"
          style={{ background: '#dbefff', padding: '10rem 15px' }}
        >
          <div className="row justify-content-center">
            <div className="col-sm-10 col-lg-6 text-sm-center">
              <WowBlock slide="down">
                <H1>About me</H1>
              </WowBlock>
              <WowBlock slide="left">
                <p>
                  I'm a web developer with{' '}
                  {Math.abs(2015 - new Date().getFullYear())} year exp working
                  as Frontender, now i'm quite open for any offers. my self, I
                  fairly well-versed in build up responsive website that
                  friendly and stand out.
                </p>
              </WowBlock>
              <WowBlock slide="up">
                <H3>
                  <A
                    target="_blank"
                    href="https://drive.google.com/open?id=0BylCAo5UYnpVWnVwaFFLSE5wOUU"
                  >
                    Hire Me!
                  </A>
                </H3>
              </WowBlock>
            </div>
          </div>
        </div>

        <div
          className="container-fluid"
          style={{ background: '#fff', padding: '4rem 15px' }}
        >
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
              <ScoreBlock percent={0.9}>HTML</ScoreBlock>
              <ScoreBlock percent={0.9}>CSS</ScoreBlock>
              <ScoreBlock percent={0.8}>Javascript</ScoreBlock>
              <ScoreBlock percent={0.8}>Responsive Web</ScoreBlock>
              <ScoreBlock percent={0.7}>Git & SVN</ScoreBlock>
              <WowBlock slide="up">
                <ul className="list-inline my-4" style={{ color: '#72a6d0' }}>
                  <li className="list-inline-item pr-3">
                    <i className="fab fa-3x fa-html5" />
                  </li>
                  <li className="list-inline-item pr-3">
                    <i className="fab fa-3x fa-css3" />
                  </li>
                  <li className="list-inline-item pr-3">
                    <i className="fab fa-3x fa-js" />
                  </li>
                  <li className="list-inline-item pr-3">
                    <i className="fab fa-3x fa-gulp" />
                  </li>
                  <li className="list-inline-item pr-3">
                    <i className="fab fa-3x fa-grunt" />
                  </li>
                  <li className="list-inline-item pr-3">
                    <i className="fab fa-3x fa-sass" />
                  </li>
                  <li className="list-inline-item pr-3">
                    <i className="fab fa-3x fa-node-js" />
                  </li>
                  <li className="list-inline-item pr-3">
                    <i className="fab fa-3x fa-joomla" />
                  </li>
                  <li className="list-inline-item pr-3">
                    <i className="fab fa-3x fa-php" />
                  </li>
                  <li className="list-inline-item pr-3">
                    <i className="fab fa-3x fa-react" />
                  </li>
                  <li className="list-inline-item pr-3">
                    <i className="fab fa-3x fa-wordpress" />
                  </li>
                </ul>
              </WowBlock>
            </div>
          </div>
        </div>

        <div className="container-fluid py-5" style={{ background: '#dbefff' }}>
          <div className="row align-items-center">
            <div className="col-lg-4 mb-4 mb-lg-0 text-lg-right">
              <WowBlock slide="up">
                <H1>Find Me at</H1>
              </WowBlock>
            </div>
            <div className="col-lg-6 offset-lg-2">
              <WowBlock slide="up">
                <ul className="list-unstyled row text-sm-left text-center">
                  <li className="col-sm col-4">
                    <A target="_blank" href="https://codepen.io/bataimx/">
                      <i className="fab fa-3x fa-codepen" />
                      <p>Codepen</p>
                    </A>
                  </li>
                  <li className="col-sm col-4">
                    <A target="_blank" href="skype:bataimx@hotmail.com">
                      <i className="fab fa-3x fa-skype" />
                      <p>Skype</p>
                    </A>
                  </li>
                  <li className="col-sm col-4">
                    <A
                      target="_blank"
                      href="https://www.linkedin.com/in/bataimx/"
                    >
                      <i className="fab fa-3x fa-linkedin" />
                      <p>Linkedin</p>
                    </A>
                  </li>
                  <li className="col-sm col-4">
                    <A target="_blank" href="https://github.com/bataimx/">
                      <i className="fab fa-3x fa-github" />
                      <p>Github</p>
                    </A>
                  </li>
                  <li className="col-sm col-4">
                    <A
                      target="_blank"
                      href="https://www.hackerrank.com/bataimx/"
                    >
                      <i className="fab fa-3x fa-hackerrank" />
                      <p>Hackerrank</p>
                    </A>
                  </li>
                </ul>
              </WowBlock>
            </div>
          </div>
        </div>
        <Careers />

        <div className="container-fluid py-5" style={{ background: '#dbefff' }}>
          <div className="row align-items-center">
            <div className="col-lg-5 mb-4 mb-lg-0 text-lg-right">
              <H1>Hey! checkout this cool game</H1>
            </div>
          </div>
        </div>
        <div className="container-fluid py-5">
          <div className="row justify-content-center">
            <div className="col-8 text-center">
              <iframe
                src="//codepen.io/anon/embed/maMEQP?height=550&amp;theme-id=1&amp;slug-hash=maMEQP&amp;default-tab=result"
                height="550"
                width="350"
                scrolling="no"
                frameBorder="0"
                allowFullScreen=""
                allowpaymentrequest=""
                name="my game"
                title="CodePen Embed maMEQP"
              >
                CodePen Embed Fallback
              </iframe>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
