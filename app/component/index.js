import React from 'react';

export default class extends React.Component {
  render(){
    return (
      <div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
