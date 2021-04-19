import React from 'react';
import { cleanup } from '@testing-library/react-native';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import LikeButton from '../../components/posts/LikeButton';

configure({ adapter: new Adapter() });
describe('<LikeButton />', () => {
  afterEach(cleanup);

  const user = 'test';
  const liked = ['test', 'nottest'];
  const notLiked = ['nottest', 'reallynottest'];

  const likedComponent = shallow(
    <LikeButton
      username={user}
      likes={liked}
      likeCount={liked.length}
    />
  );

  const notLikedComponent = shallow(
    <LikeButton
      username={user}
      likes={notLiked}
      likeCount={notLiked.length}
    />
  );

  it('properly determines like counts', () => {
    const likedIcon = likedComponent.find({ onIcon: 'heart' });
    const notLikedIcon = notLikedComponent.find({ onIcon: 'heart' });

    expect(likedIcon.prop('startStatus')).toBe(true);
    expect(notLikedIcon.prop('startStatus')).toBe(false);
  });
});