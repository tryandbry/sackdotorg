import React from 'react';
import {Editor, Raw, Plain} from 'slate';
import firebase from '../../firebase';
import keycode from 'keycode';

import Toolbar from './Toolbar';

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

// For key commands
// ------------------------------
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
// ------------------------------



export default class extends React.Component {
  state = {
    state: initialState,
    schema: {
      nodes: {
        //code: props => <pre {...props.attributes}><code>{props.children}</code></pre>,
        'block-quote': props => <blockquote {...props.attributes}>{props.children}</blockquote>,
        'bulleted-list': props => <ul {...props.attributes}>{props.children}</ul>,
        'heading-one': props => <h1 {...props.attributes}>{props.children}</h1>,
        'heading-two': props => <h2 {...props.attributes}>{props.children}</h2>,
        'heading-three': props => <h3 {...props.attributes}>{props.children}</h3>,
        'heading-four': props => <h4 {...props.attributes}>{props.children}</h4>,
        'list-item': props => <li {...props.attributes}>{props.children}</li>,
        'numbered-list': props => <ol {...props.attributes}>{props.children}</ol>,
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

  onClickMark = (event,type) => {
    event.preventDefault();
    const newState = this.state.state.change().toggleMark(type);
    this.onChange(newState);
  }

  // checks if a range already has a block type applied
  hasBlock = (type) => {
    return this.state.state.blocks.some(node => node.type == type);
  }

  onClickBlock = (event,type) => {
    event.preventDefault();

    const isList = this.hasBlock('list-item');
    const change = this.state.state.change();

    // handle non-list blocks
    if(type != 'bulleted-list' &&
       type != 'numbered-list') {
      const isActive = this.hasBlock(type);

      if(isList) {
        change
          .setBlock(isActive ? 'paragraph' : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      }
      else {
        change
          .setBlock(isActive ? 'paragraph' : type);
      }
    }
    // handle list blocks
    else {
      const isType = this.state.state.blocks.some( block => {
        return Boolean(
          document.getClosest(
            block.key,
            parent => parent.type == type
          )
        );
      });

      // if already the list type, then switch back to paragraph
      if(isList && isType) {
        change
          .setBlock('paragraph')
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      }
      // if other list type, then switch to desired list type
      else if(isList) {
        change
          .unwrapBlock(type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
          .wrapBlock(type);
      }
      // else, set to list type
      else {
        change
          .setBlock('list-item')
          .wrapBlock(type);
      }
    }

    this.onChange(change);
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
        <Toolbar
          onClickMark={this.onClickMark}
          onClickBlock={this.onClickBlock}
        />
        <hr/>
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
