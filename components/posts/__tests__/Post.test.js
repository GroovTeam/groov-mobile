import React from 'react';
import renderer from 'react-test-renderer';

import Post from '../Post';

describe('<Post />', () => {
  const testItem = {
    username: 'testpost',
    content: 'test content',
    posses: [
      'test posse'
    ]
  }
  const tree = renderer.create(
    <Post data={testItem} />
  ).toJSON();

  it('properly denies audio', () => {
    console.log(tree);
  });
});

/**
 * INCOMPLETE TEST, WE MUST STOP USING ICONTOGGLE IN INTERACTIONS TO CONTINUE
 */