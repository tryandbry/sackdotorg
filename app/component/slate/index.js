import React from 'react';
import {Editor, Raw, Plain} from 'slate';
import firebase from '../../firebase';

const database = firebase.database();

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

    if(state.document != this.state.state.document) {
      //need JSON stringify to compenstate for undefined properties in Slate state
      //otherwise, firebase will throw an error
      database.ref('test').set(JSON.stringify(state.toJSON()));
    }
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
