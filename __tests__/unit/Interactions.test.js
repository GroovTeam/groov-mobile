import React from 'react';
import { cleanup } from '@testing-library/react-native';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Interactions from '../../components/posts/Interactions';

configure({ adapter: new Adapter() });
describe('<Interactions />', () => {
  afterEach(cleanup);

  const user = 'test';
  const likes = ['one', 'two', 'three']

  const component = shallow(
    <Interactions
      username={user}
      likes={likes}
    />
  );

  it('properly determines like counts', () => {
    const likeButton = component.find({ testID: 'like-button' });

    expect(likeButton.prop('likeCount')).toBe(likes.length);
  });
});