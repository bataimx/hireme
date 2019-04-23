import React from 'react';
import A from 'components/A';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="container-fluid d-block py-2" style={{background: '#000', color: '#dfdfdf'}}>
        <div className="row">
          <div className="col-sm">
            <p className="mb-0">My Portfolio, More on updating...</p>
          </div>
          <div className="col-sm text-sm-right">
            <A href="mailto:bataimx@gmail.com"><span className="mr-3"><i className="fas fa-at"></i> bataimx@gmail.com</span></A>
            <span><i className="fas fa-phone"></i> 0979625636</span>
          </div>
        </div>
      </div>;
  }
}

export default Footer;