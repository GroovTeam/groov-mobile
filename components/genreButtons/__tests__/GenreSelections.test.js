import React from 'react';
import renderer from 'react-test-renderer';

import GenreSelections from '../GenreSelections';
import Tags from '../../../utils/Tags';

describe('<GenreSelections />', () => {
  const tags = Tags;
  const selectionColor = '#00ff0044';
  it('creates the correct number of children', () => {
    const tree = renderer.create(
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

    const tree = renderer.create(
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