import React from 'react';
import {Editor, Raw, Plain} from 'slate';
import firebase from '../../firebase';
import keycode from 'keycode';

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

function MarkHotkey({type, key, isAltKey = false, isCtrlKey = false}){
  return {
    onKeyDown(event,data,change) {
      if(             !event.ctrlKey || 
         keycode(event.which) != key ||
            event.altKey != isAltKey
        ) return;

      event.preventDefault();

      change.toggleMark(type);
      return true;
    }
  }
}

const plugins = [
  MarkHotkey({key: 'b', type: 'bold'}),
  MarkHotkey({key: 'c', type: 'code', isAltKey: true}),
  MarkHotkey({key: 'i', type: 'italic'}),
  MarkHotkey({key: 'd', type: 'strikethrough'}),
  MarkHotkey({key: 'u', type: 'underline'}),
];

export default class extends React.Component {
  state = {
    state: initialState,
    schema: {
      nodes: {
        code: props => <pre {...props.attributes}><code>{props.children}</code></pre>,
      },
      marks: {
        bold: props => <strong>{props.children}</strong>,
        code: props => <code>{props.children}</code>,
        italic: props => <em>{props.children}</em>,
        strikethrough: props => <del>{props.children}</del>,
        underline: props => <u>{props.children}</u>,
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
