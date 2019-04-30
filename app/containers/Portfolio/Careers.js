import React from 'react';
import H1 from 'components/H1';
import WowBlock from './WowBlock';
import Img from 'components/Img';
import redteam from './Thumbs/redteam.jpg';
import sezaxvn from './Thumbs/sezaxvn.jpg';
import sutrixco from './Thumbs/sutrixco.jpg';
import stayjapan from './Thumbs/stayjapan.jpg';

const data = [{
    yrs: <>20<br/>19</>,
    src: sezaxvn,
    name: 'Sezax vietnam',
    intro: <>
      <p>The company with traditional business of printing.
        Sezax Corporation in Japan was founded in 1948</p>
      <p>I joined Sezax as frontend leader, implement Sezax their own projects.</p>
    </>
  },
  {
    yrs: <>20<br/>18</>,
    src: stayjapan,
    name: 'Hyakusenrenma vietnam',
    intro: <>
      <p>Hyakusenrenma is japanese company with stayjapan.com is main business
        that's provide home-sharing services.</p>
      <p>I was joined small team in vietnam as senior frontend position.</p>
    </>
  },
  {
    yrs: <>20<br/>17</>,
    src: sutrixco,
    name: 'Sutrix solutions',
    intro: <>
      <p>Sutrix Group offers on-site digital consultancy and digital
        production services globally.
      </p>
      <p>I was joined sutrix as a frontender to
        remote support a team in singapore.</p>
    </>
  },
  {
    yrs: <>20<br/>16</>,
    src: redteam,
    name: 'redWEB ApS',
    intro: <>
      <p>redWEB.vn is product company of denmark,
        provide ecommercer products/solutions base on joomla-cms.
      </p>
      <p>I was joined redweb as a frontender and support joomla template team.</p>
    </>
  }]; 

class Careers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = data.map((currentValue, idx) => {
      if( idx % 2 == 0 ) {
        return <dl key={idx} className="row time-line-row align-items-stretch">
          <div className="col-sm-3 col-lg-2 time-line-title order-lg-2 text-lg-right text-sm-right">
            <WowBlock slide="up">{currentValue.yrs}</WowBlock>
          </div>
          <div className="col-sm-9 col-lg-5 time-line-data order-lg-3">
            <WowBlock slide="left">
              <b>{currentValue.name}</b>
              {currentValue.intro}
            </WowBlock>
          </div>
          <div className="col-sm-6 offset-sm-3 offset-lg-0 col-lg-5 order-lg-1 time-line-image pb-5">
            <WowBlock slide="right">
              <Img className="img-fluid" src={currentValue.src} alt={currentValue.name} />
            </WowBlock>
          </div>
        </dl>;
      }

      return <dl key={idx} className="row time-line-row align-items-stretch">
        <div className="col-sm-3 col-lg-2 time-line-title order-lg-2 text-lg-left text-sm-right">
          <WowBlock slide="up">{currentValue.yrs}</WowBlock>
        </div>
        <div className="col-sm-9 col-lg-5 time-line-data text-lg-right">
          <WowBlock slide="right">
            <b>{currentValue.name}</b>
            {currentValue.intro}
          </WowBlock>
        </div>
        <div className="col-sm-6 offset-sm-3 offset-lg-0 col-lg-5 order-lg-3 time-line-image pb-5">
          <WowBlock slide="left">
            <Img className="img-fluid" src={currentValue.src} alt={currentValue.name} />
          </WowBlock>
        </div>
      </dl>;
    })

    return <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="row justify-content-center">
          <div className="col-lx-6 col-lg-9 time-line">
            <WowBlock slide="right">
              <H1 className="pb-3">My Entire Career</H1>
            </WowBlock>

            {/* future plan */}
            <div className="row time-line-row d-none d-lg-flex">
              <div className="col-sm-3  offset-lg-5 col-lg-2 time-line-title"></div>
              <div className="col-sm-9 col-lg-5 time-line-data"></div>
            </div>

            {items}
          </div>
        </div>
      </div>;
  }
}

export default Careers;