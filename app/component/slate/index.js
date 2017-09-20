import React from 'react';
import {Editor, Raw, Plain} from 'slate';
import firebase from '../../firebase';

const database = firebase.database();

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

function MarkHotkey({type, code, isAltKey = false}){
  console.log('MarkHotkey:',type, code, isAltKey);
  return {
    onKeyDown(event,data,change) {
      console.log('code: ',code, 'isAltKey: ',isAltKey);
      console.log('key: ' + event.which + ' altKey:' + event.altKey);
      if(event.which != code || event.altKey != isAltKey) {
        console.log('no match');
        return;
      }
      console.log('match');

      event.preventDefault();

      change.toggleMark(type);
      return true;
    }
  }
}

const boldPlugin = MarkHotkey({
  type: 'bold',
  code: 66,
  isAltKey: true,
});

const plugins = [
  boldPlugin,
];

export default class extends React.Component {
  state = {
    state: initialState,
    schema: {
      nodes: {
        code: props => <pre {...props.attributes}><code>{props.children}</code></pre>,
      },
      marks: {
        bold: props => <strong>{props.children}</strong>
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

  /*
  onKeyDown = (event,data,change) => {
    console.log(event.which + 'metaKey:' + event.metaKey + ' altKey:' + event.altKey);

    if(!event.altKey) return;

    event.preventDefault();

    switch(event.which) {
      case 66:
        change.toggleMark('bold');
        return true;
      case 67:
        const isCode = change.state.blocks.some(block => block.type == 'code');
        change.setBlock(isCode ? 'paragraph' : 'code');
        return true;
    }
  }
  */

  render() {

    return (
      <div>
        <Editor 
          plugins={plugins}
          state={this.state.state}
          schema={this.state.schema}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
