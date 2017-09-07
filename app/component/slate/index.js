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

  render() {

    return (
      <div>
        <Editor 
          state={this.state.state}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
