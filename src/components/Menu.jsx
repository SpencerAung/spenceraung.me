import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Pic from '../images/profile.jpg'

const StyledMenu = styled.menu`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 4rem;
`

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
`

const ProfileImg = styled.div`
  margin-left: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: pink;
  background-image: url(${Pic});
  background-size: cover;
  border: 1px solid green;
`

const Menu = () => (
  <StyledMenu>
    <Link to='/'>
      <ProfileImg /> Spencer Aung
    </Link>
    <div>
      <MenuLink to='/' activeClassName='active'>
        Home
      </MenuLink>
      <MenuLink to='/blog/' activeClassName='active'>
        Blog
      </MenuLink>
    </div>
  </StyledMenu>
)

export default Menu
