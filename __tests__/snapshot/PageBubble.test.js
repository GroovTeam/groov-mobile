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

  it('renders properly', () => {
    expect(tree).toMatchSnapshot();
  });
});