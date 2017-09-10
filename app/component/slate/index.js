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
    schema: {
      nodes: {
        code: props => <pre {...props.attributes}><code>{props.children}</code></pre>,
      },
    }
  };

  onChange = ({state}) => {
    this.setState({state});
  }

  onKeyDown = (event,data,change) => {
    console.log(event.which + 'metaKey:' + event.metaKey + ' altKey:' + event.altKey);

    if(event.which != 67 || !event.altKey) {
      return;
    }

    event.preventDefault();
    const isCode = change.state.blocks.some(block => block.type == 'code');

    change.setBlock(isCode ? 'paragraph' : 'code');
    return true;
  }

  render() {

    return (
      <div>
        <Editor 
          state={this.state.state}
          schema={this.state.schema}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
}
