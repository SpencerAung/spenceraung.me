import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Image from './Image'

const StyledSection = styled.menu`
  padding: 0;
  text-align: center;
  background-color: ${({ theme }) => theme.yellow};
`

const ImageWrapper = styled.div`
  width: 102px;
  height: 102px;
  margin: 2rem auto;
  background-color: ${({ theme }) => theme.lightGrey};
  border-radius: 50%;
  text-align: center;
  box-shadow: inset 0px 0px 1px 0px rgba(0, 0, 0, 0.3);
`

const MenuLink = styled.div`
  width: 100%;
  padding: 10px;
  text-align: center;

  a {
    position: relative;
    color: ${({ theme }) => theme.black};
    text-decoration: none;
    font-size: 1.8rem;
    font-weight: 500;
  }

  a:hover,
  a.active {
    color: ${({ theme }) => theme.black};
    font-weight: 700;
  }

  a:hover::after,
  a.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    border-bottom: 2px solid ${({ theme }) => theme.blue};
  }
`

const SideMenu = () => (
  <StyledSection>
    <ImageWrapper>
      <Image />
    </ImageWrapper>
    <MenuLink>
      <Link to='/' activeClassName='active'>
        Blog
      </Link>
    </MenuLink>
    <MenuLink>
      <Link to='/about' activeClassName='active'>
        About
      </Link>
    </MenuLink>
  </StyledSection>
)

export default SideMenu
