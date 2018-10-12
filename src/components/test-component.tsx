import * as React from 'react';
import imgSrc from '../assets/images/react-logo.png';

class TestComponent extends React.Component {
  displayName = 'TestComponent';
  constructor(props:any) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <img src={imgSrc} alt="react logo" />
      </React.Fragment>
    );
  }
}

export default TestComponent;
