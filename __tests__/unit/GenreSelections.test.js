import React from 'react';
import { cleanup, render } from '@testing-library/react-native';

import GenreSelections from '../../components/genreButtons/GenreSelections';
import Tags from '../../utils/Tags';

describe('<GenreSelections />', () => {
  afterEach(cleanup);

  const tags = Tags;
  const selectionColor = '#00ff0044';
  it('creates the correct number of children', () => {
    const tree = render(
      <GenreSelections
        data={tags}
        color={selectionColor}
        updateButtons={() => {}}
      />
    ).toJSON();
    expect(tree.children.length).toBe(Object.keys(Tags).length);
  });
  
  it('allows for selections', () => {
    tags[Object.keys(tags)[0]] = true;

    const tree = render(
      <GenreSelections
        data={tags}
        color={selectionColor}
        updateButtons={() => {}}
      />
    ).toJSON();

    expect(tree.children[0].children[0].props.style.backgroundColor).toBe(selectionColor);
    expect(tree.children[1].children[0].props.style.backgroundColor).toBe('white');
  });
});