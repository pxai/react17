import React from 'react';
import { AppContext } from './AppContext';

class Controls extends React.Component {
  constructor (props) {
    super(props);
    this.state = { result: ''};
  }

  doIt() {
    this.context.bus.emit("add", {name: 'ppp'})
  }

  render () {
    return (
      <div className="Controls">
          <button onClick={() => this.doIt() }>Click me</button>
          <div>{this.state.result}</div>
      </div>
    );
  }
}

Controls.contextType = AppContext;
export default Controls;