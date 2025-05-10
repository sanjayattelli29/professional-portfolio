import React, { useState } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Bio } from "../data/constants";
import { MenuRounded } from "@mui/icons-material";
import { Instagram } from "@mui/icons-material";
import behanceIcon from '../images/behance.png'

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;
const NavLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  color: inherit;
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const MobileIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 0 6px;
  list-style: none;
  width: 100%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 80px;
  right: 0;

  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">Design with Sanjay</NavLogo>

        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        <NavItems>
          <NavLink href="#About">About</NavLink>
          <NavLink href="#Skills">Skills</NavLink>
          <NavLink href="#Experience">Experience</NavLink>
          <NavLink as={LinkR} to="/all-projects">Projects</NavLink>

          <NavLink href="#Education">Education</NavLink>
        </NavItems>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#About">
              About
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Skills">
              Skills
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Experience">
              Experience
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Projects">
              Projects
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Education">
              Education
            </NavLink>
            <NavLink as={LinkR} to="/all-projects" onClick={() => setIsOpen(!isOpen)}>
              Explore Projects
            </NavLink>
            <GithubButton href={Bio.github} target="_Blank">
              <img src={behanceIcon} alt="" style={{marginRight:"3px"}}/>
              Behance
            </GithubButton>
          </MobileMenu>
        )}

        <ButtonContainer style={{ gap: '12px' }}>
          <GithubButton href="https://www.behance.net/attellisanjay/" target="_Blank">
            {/* <Instagram style={{marginRight:"3px"}}/> */}
            <img src={behanceIcon} alt="" style={{marginRight:"3px"}}/>
            Behance
          </GithubButton>
          <GithubButton href="https://github.com/sanjayattelli29" target="_Blank">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:"3px"}}>
              <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.5 21.278 9.5 21.012C9.5 20.768 9.49 20.046 9.49 19.192C7 19.69 6.35 18.584 6.15 18.041C6.037 17.756 5.55 16.931 5.125 16.687C4.775 16.492 4.275 15.994 5.112 15.984C5.9 15.975 6.463 16.726 6.65 17.022C7.55 18.615 8.988 18.074 9.54 17.809C9.63 17.172 9.89 16.732 10.17 16.49C7.88 16.248 5.5 15.409 5.5 11.614C5.5 10.519 5.9 9.621 6.677 8.921C6.577 8.666 6.217 7.614 6.778 6.211C6.778 6.211 7.617 5.945 9.5 7.261C10.29 7.036 11.15 6.924 12 6.924C12.85 6.924 13.71 7.036 14.5 7.261C16.383 5.935 17.222 6.211 17.222 6.211C17.783 7.614 17.423 8.666 17.323 8.921C18.1 9.621 18.5 10.509 18.5 11.614C18.5 15.419 16.108 16.248 13.818 16.49C14.178 16.8 14.5 17.393 14.5 18.332C14.5 19.68 14.49 20.663 14.49 21.012C14.49 21.278 14.65 21.591 15.15 21.489C17.135 20.821 18.831 19.535 20.061 17.804C21.292 16.074 21.996 14.005 22 11.877C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
            </svg>
            Github
          </GithubButton>
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
