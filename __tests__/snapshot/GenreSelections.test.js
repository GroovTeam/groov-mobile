import React from 'react';
import { cleanup, render } from '@testing-library/react-native';

import GenreSelections from '../../components/genreButtons/GenreSelections';
import Tags from '../../utils/Tags';

describe('<GenreSelections />', () => {
  afterEach(cleanup);

  const tags = Tags;
  const selectionColor = '#00ff0044';
  it('renders properly', () => {
    const tree = render(
      <GenreSelections
        data={tags}
        color={selectionColor}
        updateButtons={() => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});