import React from 'react';

export default (props) => {
  const markBold = event => props.onClickMark(event,'bold');
  const markItalic = event => props.onClickMark(event,'italic');
  const markUnderline = event => props.onClickMark(event,'underline');
  const markStrikethrough = event => props.onClickMark(event,'strikethrough');

  //const blockCode = event => props.onClickBlock(event,'code');
  const markCode = event => props.onClickMark(event,'code');
  
  const blockH1 = event => props.onClickBlock(event,'heading-one');
  const blockH2 = event => props.onClickBlock(event,'heading-two');
  const blockH3 = event => props.onClickBlock(event,'heading-three');
  const blockH4 = event => props.onClickBlock(event,'heading-four');
  const blockQuote = event => props.onClickBlock(event,'block-quote');
  const blockListBullet = event => props.onClickBlock(event,'bulleted-list');
  const blockListNumber = event => props.onClickBlock(event,'numbered-list');

  return (
    <div>
      <span className="btn btn-default fa fa-bold" onClick={markBold}></span>
      <span className="btn btn-default fa fa-italic" onClick={markItalic}></span>
      <span className="btn btn-default fa fa-underline" onClick={markUnderline}></span>
      <span className="btn btn-default fa fa-strikethrough" onClick={markStrikethrough}></span>
      <span className="btn btn-default fa fa-code" onClick={markCode}></span>
      <div className="dropdown c-inline">
        <button
          className="btn btn-default dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
        >
        <span className="fa fa-header"></span>
        &nbsp;
        <span className="fa fa-caret-down"></span>
        </button>
        <div className="dropdown-menu">
          <span className="dropdown-item" onClick={blockH1}><h1>AaBbCc</h1>Heading 1</span>
          <span className="dropdown-item" onClick={blockH2}><h2>AaBbCc</h2>Heading 2</span>
          <span className="dropdown-item" onClick={blockH3}><h3>AaBbCc</h3>Heading 3</span>
          <span className="dropdown-item" onClick={blockH4}><h4>AaBbCc</h4>Heading 4</span>
        </div>
      </div>
      <span className="btn btn-default fa fa-quote-right" onClick={blockQuote}></span>
      <span className="btn btn-default fa fa-list-ul" onClick={blockListBullet}></span>
      <span className="btn btn-default fa fa-list-ol" onClick={blockListNumber}></span>
    </div>
  );
}
