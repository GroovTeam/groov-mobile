import React from 'react';
import { cleanup, render } from '@testing-library/react-native';

import Comment from '../../components/posts/Comment';

describe('<Comment />', () => {
  afterEach(cleanup);

  it('renders properly', () => {
    const tree = render(
      <Comment
        comment={'yooooo cool comment :D'}
        username={'test'}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});