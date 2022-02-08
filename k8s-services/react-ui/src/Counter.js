import React, { Component } from 'react';
import axios from 'axios';

class Counter extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }
    componentDidMount() {
        axios.get(`https://node-api.com/`)
          .then(res => {
            const n = res.data.counts;
            this.setState({ count: n });
          }, reason => {
            this.setState({ count: -1 });
            console.log(reason)
          });
      }

    handleIncrement = () => {
        axios.post(`https://node-api.com/`)
          .then(res => {
            const n = res.data.counts;
            this.setState({ count: n });
          }, reason => {
            this.setState({ count: -1 });
            console.log(reason)
          });
    };
    
    handleReset = () => {
        axios.delete(`https://node-api.com/`)
          .then(res => {
            const n = res.data.counts;
            this.setState({ count: n });
          }, reason => {
            this.setState({ count: -1 });
            console.log(reason)
          });
    };

    handleFetch = () => {
        return this.state.count;
    };
  
    render() {
      return (
        <div className="Button-holder">
          <button className="App-link" onClick={() => this.handleIncrement()}>Add to counter</button>
          <button className="App-link" onClick={() => this.handleReset()}>Reset counter</button>
          <p className="Counter-value">{ this.handleFetch() }</p>
        </div>
      );
    }
  }

export default Counter;