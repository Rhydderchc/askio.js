'use strict';

const utils = require('./helper');

module.exports = (prompt, options = {}) => {
  prompt.cursorHide();

  let { input = '', initial = '', pos, showCursor = true, color } = options;
  let style = color || prompt.styles.placeholder;
  let inverse = utils.inverse(prompt.styles.primary);
  let blinker = str => inverse(prompt.styles.black(str));
  let output = input;
  let char = ' ';
  let reverse = blinker(char);

  if (prompt.blink && prompt.blink.off === true) {
    blinker = str => str;
    reverse = '';
  }

  if (showCursor && pos === 0 && initial === '' && input === '') {
    return blinker(char);
  }

  if (showCursor && pos === 0 && (input === initial || input === '')) {
    return blinker(initial[0]) + style(initial.slice(1));
  }

  initial = utils.isPrimitive(initial) ? `${initial}` : '';
  input = utils.isPrimitive(input) ? `${input}` : '';

  let placeholder = initial && initial.startsWith(input) && initial !== input;
  let cursor = placeholder ? blinker(initial[input.length]) : reverse;

  if (pos !== input.length && showCursor === true) {
    output = input.slice(0, pos) + blinker(input[pos]) + input.slice(pos + 1);
    cursor = '';
  }

  if (showCursor === false) {
    cursor = '';
  }

  if (placeholder) {
    let raw = prompt.styles.unstyle(output + cursor);
    return output + cursor + style(initial.slice(raw.length));
  }

  return output + cursor;
};
