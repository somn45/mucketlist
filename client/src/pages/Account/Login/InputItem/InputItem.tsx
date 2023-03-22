import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import Icon from '../../../../components/Icon';

import { AccountInputFrame as StyledInputItem } from '../../../../styles/account/accountStyle';
import { InputTab } from '../../../../styles/account/loginStyle';
import { InputProps } from '../../../../types/atomTypes/atom';

interface InputItemProps extends InputProps {
  icon: IconDefinition;
}

function InputItem({
  type,
  value,
  setState,
  placeholder,
  icon,
}: Omit<InputItemProps, 'InputStyle'>) {
  return (
    <InputTab>
      <StyledInputItem
        type={type}
        value={value}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
      />
      <Icon icon={icon} />
    </InputTab>
  );
}

export default React.memo(InputItem);
