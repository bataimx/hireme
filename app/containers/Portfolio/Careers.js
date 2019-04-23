import React from 'react';
import H1 from 'components/H1';
import WowBlock from './WowBlock';
import Img from 'components/Img';
import redteam from './Thumbs/redteam.jpg';
import sezaxvn from './Thumbs/sezaxvn.jpg';
import sutrixco from './Thumbs/sutrixco.jpg';
import stayjapan from './Thumbs/stayjapan.jpg';

class Careers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="row justify-content-center">
          <div className="col-lg-6 time-line">
            <WowBlock slide="right">
              <H1 className="pb-3">My Entire Career</H1>
            </WowBlock>

            {/* future plan */}
            <div className="row time-line-row">
              <div className="col-sm-3  offset-lg-5 col-lg-2 time-line-title"></div>
              <div className="col-sm-9 col-lg-5 time-line-data"></div>
            </div>

            <dl className="row time-line-row align-items-stretch">
              <div className="col-sm col-lg-5 time-line-image pb-5">
                <WowBlock slide="right">
                  <Img className="img-fluid" src={sezaxvn} alt="sezaxvn" />
                </WowBlock>
              </div>
              <div className="col-sm-3 col-lg-2 time-line-title">
                <WowBlock slide="up">20<br/>19</WowBlock>
              </div>
              <div className="col-sm-9 col-lg-5 time-line-data pb-5">
                <WowBlock slide="left">
                  <b>Sezax vietnam</b>
                  <p>The company with traditional business of printing.
                    Sezax Corporation in Japan was founded in 1948</p>
                  <p>I joined Sezax as frontend leader, implement Sezax their own projects.</p>
                </WowBlock>
              </div>
            </dl>

            <dl className="row time-line-row align-items-stretch">
              <div className="col-sm col-lg-5 order-lg-3 time-line-image pb-5">
                <WowBlock slide="left">
                  <Img className="img-fluid" src={stayjapan} alt="stayjapan" />
                </WowBlock>
              </div>
              <div className="col-sm-3 col-lg-2 time-line-title order-lg-2 text-lg-left">
                <WowBlock slide="up">20<br/>18</WowBlock>
              </div>
              <div className="col-sm-9 col-lg-5 time-line-data text-lg-right">
                <WowBlock slide="right">
                  <b>Hyakusenrenma vietnam</b>
                  <p>Hyakusenrenma is japanese company with stayjapan.com is main business
                    that's provide home-sharing services.</p>
                  <p>I was joined small team in vietnam as senior frontend position.</p>
                </WowBlock>
              </div>
            </dl>

            <dl className="row time-line-row align-items-stretch">
              <div className="col-sm col-lg-5 time-line-image pb-5">
                <WowBlock slide="right">
                  <Img className="img-fluid" src={sutrixco} alt="sutrixco" />
                </WowBlock>
              </div>
              <div className="col-sm-3 col-lg-2 time-line-title">
                <WowBlock slide="up">20<br/>17</WowBlock>
              </div>
              <div className="col-sm-9 col-lg-5 time-line-data">
                <WowBlock slide="left">
                  <b>Sutrix solutions</b>
                  <p>Sutrix Group offers on-site digital consultancy and digital
                    production services globally.
                  </p>
                  <p>I was joined sutrix as a frontender to
                    remote support a team in singapore.</p>
                </WowBlock>
              </div>
            </dl>

            <dl className="row time-line-row align-items-stretch">
              <div className="col-sm col-lg-5 order-lg-3 time-line-image pb-5">
                <WowBlock slide="left">
                  <Img className="img-fluid" src={redteam} alt="redteam" />
                </WowBlock>
              </div>
              <div className="col-sm-3 col-lg-2 time-line-title order-2 text-lg-left">
                <WowBlock slide="up">20<br/>16</WowBlock>
              </div>
              <div className="col-sm-9 col-lg-5 time-line-data text-lg-right">
                <WowBlock slide="right">
                  <b>redWEB ApS</b>
                  <p>redWEB.vn is product company of denmark,
                    provide ecommercer products/solutions base on joomla-cms.
                  </p>
                  <p>I was joined redweb as a frontender and support joomla template team.</p>
                </WowBlock>
              </div>
            </dl>
          </div>
        </div>
      </div>;
  }
}

export default Careers;