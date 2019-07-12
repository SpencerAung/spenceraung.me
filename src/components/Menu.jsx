import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const StyledMenu = styled.menu`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  padding: 4rem;
`;

const MenuLink = styled(Link)`
  position: relative;
  margin: 0 2rem;
  font-size: 2rem;
  font-weight: 500;

  &:hover,
  &.active {
    font-weight: 600;
  }

  &.active {
    text-decoration: underline;
  }
`;

const Menu = () => (
  <StyledMenu>
    <MenuLink to="/" activeClassName="active">
      Home
    </MenuLink>
    <MenuLink to="/blog/" activeClassName="active">
      Blog
    </MenuLink>
  </StyledMenu>
);

export default Menu;
