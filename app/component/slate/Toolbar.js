import React from 'react';

export default (props) => {
  const markBold = event => props.onClickMark(event,'bold');
  const markItalic = event => props.onClickMark(event,'italic');
  const markUnderline = event => props.onClickMark(event,'underline');
  const markStrikethrough = event => props.onClickMark(event,'strikethrough');

  return (
    <div>
      <span className="btn btn-default fa fa-bold" onClick={markBold}></span>
      <span className="btn btn-default fa fa-italic" onClick={markItalic}></span>
      <span className="btn btn-default fa fa-underline" onClick={markUnderline}></span>
      <span className="btn btn-default fa fa-strikethrough" onClick={markStrikethrough}></span>
      <span className="btn btn-default fa fa-code"></span>
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
          <span className="dropdown-item" href="#"><h1>AaBbCc</h1>Heading 1</span>
          <span className="dropdown-item" href="#"><h2>AaBbCc</h2>Heading 2</span>
          <span className="dropdown-item" href="#"><h3>AaBbCc</h3>Heading 3</span>
          <span className="dropdown-item" href="#"><h4>AaBbCc</h4>Heading 4</span>
        </div>
      </div>
      <span className="btn btn-default fa fa-quote-right"></span>
      <span className="btn btn-default fa fa-list-ol"></span>
      <span className="btn btn-default fa fa-list-ul"></span>
    </div>
  );
}
