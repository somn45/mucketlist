import React from 'react';
import { MenuList as StyledMenuList } from '../../../styles/header/headerStyle';
import { IChildren } from '../../../types/moduleTypes/moduleTypes';

function MenuList({ children }: IChildren) {
  return <StyledMenuList>{React.Children.toArray(children)}</StyledMenuList>;
}

export default MenuList;
