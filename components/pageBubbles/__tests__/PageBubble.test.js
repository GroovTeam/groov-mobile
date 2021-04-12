import React from 'react';
import renderer from 'react-test-renderer';

import PageBubble from '../PageBubble';

describe('<PageBubble />', () => {
  const n = 5;
  const k = 2;
  const tree = renderer.create(
    <PageBubble
      numBubbles={n}
      index={k}
    />
  ).toJSON();
  it(`has ${n} children`, () => {
    expect(tree.children.length).toBe(n);
  });
  it(`selects the ${k} indexed child`, () => {
    expect(tree.children[k].props.style.length).toBe(2);
    expect(tree.children[0].props.style.length).toBe(1);
  });
});