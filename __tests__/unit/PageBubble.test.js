import React from 'react';
import { cleanup, render, } from '@testing-library/react-native';

import PageBubble from '../../components/pageBubbles/PageBubble';

describe('<PageBubble />', () => {
  afterEach(cleanup);

  const n = 5;
  const k = 2;
  const tree = render(
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