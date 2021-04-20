import React from 'react';
import { cleanup } from '@testing-library/react-native';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import IconToggle from '../../components/IconToggle';

configure({ adapter: new Adapter() });
describe('<IconToggle />', () => {
  afterEach(cleanup);

  const mockActivate = jest.fn(() => {});
  const mockDeActivate = jest.fn(() => {});

  const on = 'add-outline';
  const off = 'subtract-outline';

  const startOff = shallow(
    <IconToggle
      onActivate={mockActivate}
      onDeactivate={mockDeActivate}
      onIcon={on}
      offIcon={off}
      color='#000000'
      size={32}
    />
  );

  const startOn = shallow(
    <IconToggle
      onActivate={mockActivate}
      onDeactivate={mockDeActivate}
      onIcon={on}
      offIcon={off}
      startStatus={true}
      color='#000000'
      size={32}
    />
  );

  it('starts in the correct state', () => {
    expect(startOff.length).toBe(1);
    expect(startOff.find({ name: off }).length).toBe(1);

    expect(startOn.length).toBe(1);
    expect(startOn.find({ name: on }).length).toBe(1);
  });

  it('correctly toggles', () => {
    const startOffButton = startOff.find({ testID: 'button' });
    startOffButton.simulate('press');
    
    expect(mockActivate.mock.calls.length).toBe(1);
    expect(mockDeActivate.mock.calls.length).toBe(0);

    const startOnButton = startOn.find({ testID: 'button' });
    startOnButton.simulate('press');

    expect(mockActivate.mock.calls.length).toBe(1);
    expect(mockDeActivate.mock.calls.length).toBe(1);
  });
});