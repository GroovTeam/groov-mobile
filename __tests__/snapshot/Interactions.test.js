import React from 'react';
import { cleanup, render } from '@testing-library/react-native';

import Interactions from '../../components/posts/Interactions';

describe('<Interactions />', () => {
  afterEach(cleanup);

  it('renders properly', () => {
    const tree = render(
      <Interactions
        username={'test'}
        likes={['test', 'nottest']}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});