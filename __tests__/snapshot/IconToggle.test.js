import React from 'react';
import { cleanup, render } from '@testing-library/react-native';

import IconToggle from '../../components/IconToggle';

describe('<IconToggle /> -- Snapshot', () => {
  afterEach(cleanup);

  it('renders properly', () => {
    const tree = render(
      <IconToggle
        onActivate={() => {}}
        onDeactivate={() => {}}
        onIcon={'heart'}
        offIcon={'heart-outlined'}
        color={'red'}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});