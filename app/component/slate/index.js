import React from 'react';
import {Editor, Raw} from 'slate';

/*
const initialState = Raw.deserialize({
  nodes: [
    {
      kind: 'block',
      type: 'paragraph',
      nodes: [
        {
          kind: 'text',
          text: 'A line of text in a paragraph.'
        }
      ]
    }
  ]
}, { terse: true })
*/

const initialState = Raw.deserialize({
  nodes: [
    {
      kind: 'block',
      type: 'paragraph',
      nodes: [
        {
          kind: 'text',
          text: 'A line of text in a paragraph.',
        },
      ],
    },
  ],
}, {terse: true});

export default class extends React.Component {
  state = {
    state: initialState,
  };

  onChange = ({state}) => {
    this.setState({state});
  }

  onKeyDown = (event,data,change) => {

    if(event.which != 55 || !event.shiftKey) {
      return;
    }

    event.preventDefault();
    change.insertText('and');
    return true;
  }

  render() {

    return (
      <div>
        <Editor 
          state={this.state.state}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
}
