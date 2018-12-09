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
  color: ${({ theme }) => theme.black};
  text-decoration: none;
  font-size: 2rem;
  font-weight: 500;

  &:hover,
  &.active {
    color: ${({ theme }) => theme.black};
    font-weight: 700;
  }

  &.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    border-bottom: 2px solid ${({ theme }) => theme.blue};
  }
`;

const Menu = () => (
  <StyledMenu>
    <MenuLink to="/" activeClassName="active">
      Blog
    </MenuLink>
    {/* <MenuLink to="/about" activeClassName="active">
      About
    </MenuLink> */}
  </StyledMenu>
);

export default Menu;
