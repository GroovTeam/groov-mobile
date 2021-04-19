import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconToggle = ({ onActivate, onDeactivate, startStatus, onIcon, offIcon, color, size }) => {

  const [toggled, setToggled] = useState(startStatus);

  const toggle = async () => {
    if (toggled)
      await onDeactivate();
    else
      await onActivate();

    setToggled(!toggled);
  };

  return (
    <TouchableOpacity
      testID='button'
      style={{marginBottom: 5}}
      onPress={toggle}
    >
      <Ionicons
        name={toggled ? onIcon : offIcon}
        size={size ? size : 45}
        color={color}
      />
    </TouchableOpacity>
  );
};

export default IconToggle;