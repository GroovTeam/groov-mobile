import React from 'react';
import { cleanup, render } from '@testing-library/react-native';

import LikeButton from '../../components/posts/LikeButton';

describe('<LikeButton />', () => {
  afterEach(cleanup);

  it('renders properly', () => {
    const tree = render(
      <LikeButton
        username={'test'}
        likes={['one', 'two']}
        likeCount={2}
        size={32}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});