import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import projectsData from "../data/projectsData";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 50px 0 60px 0;
  background: ${({ theme }) => theme.bg};
  position: relative;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 240px;
    background: linear-gradient(135deg, ${({ theme }) => `${theme.primary}22`}, ${({ theme }) => `${theme.primary}05`});
    z-index: 0;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Tagline = styled.h2`
  text-align: left;
  font-size: 2.8rem;
  font-weight: 800;
  margin: 0;
  color: ${({ theme }) => theme.primary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -16px;
    left: 0;
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.primary};
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    text-align: center;
    
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    display: none; /* Hide on mobile */
  }
`;

// Mobile social links dropdown
const MobileSocialContainer = styled.div`
  display: none;
  position: relative;
  
  @media (max-width: 768px) {
    display: block;
    margin-top: 20px;
  }
`;

const SocialToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  border: 1.5px solid ${({ theme }) => theme.primary};
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: #fff;
  }
  
  svg {
    font-size: 18px;
  }
`;

const SocialDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: ${({ theme }) => theme.card};
  border: 1.5px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  overflow: hidden;
  z-index: 20;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: all 0.3s ease;
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  width: 160px;
`;

const SocialDropdownItem = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 0.9rem;
  
  &:hover {
    background: ${({ theme }) => theme.primary + 10};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.primary + 20};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  border: 1.5px solid ${({ theme }) => theme.primary};
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: #fff;
    transform: translateY(-3px);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

// Animation for sliding project names - keeping the definition but not using it
const slideLeft = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const ToggleButtonGroup = styled.div`
  display: flex;
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  border-radius: 12px;
  font-weight: 500;
  margin: 22px 0 40px 0;
  @media (max-width: 768px){
    display: none; /* Hide on mobile */
  }
`;

const ToggleButton = styled.div`
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }
  ${({ active, theme }) =>
    active &&
    `
  background:  ${theme.primary + 20};
  `}
`;

const Divider = styled.div`
  width: 1.5px;
  background: ${({ theme }) => theme.primary};
`;

// Mobile dropdown components
const MobileFilterContainer = styled.div`
  display: none;
  position: relative;
  width: 100%;
  margin: 22px 0 40px 0;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  border: 1.5px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary + 10};
  }
  
  svg {
    font-size: 20px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.card};
  border: 1.5px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  overflow: hidden;
  z-index: 10;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: all 0.3s ease;
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme, active }) => active ? theme.primary : theme.text_primary};
  font-weight: ${({ active }) => active ? '600' : '400'};
  background: ${({ theme, active }) => active ? theme.primary + 15 : 'transparent'};
  
  &:hover {
    background: ${({ theme }) => theme.primary + 10};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.primary + 20};
  }
`;

// Removed the sliding project names bar as requested

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  width: 100%;
  margin: 0 auto;
`;

const ProjectCard = styled.div`
  display: flex;
  align-items: stretch;
  background: ${({ theme }) => theme.card};
  border-radius: 24px;
  box-shadow: 0 12px 40px 0 rgba(0,0,0,0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px 0 rgba(0,0,0,0.12);
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 50%;
  aspect-ratio: 455/256;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 100%;
    aspect-ratio: 455/256;
  }
`;

const ImageCarousel = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const CarouselSlide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => (props.active ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  z-index: ${props => (props.active ? 2 : 1)};
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    border-radius: 24px 24px 0 0;
  }
`;

const CarouselControls = styled.div`
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  z-index: 3;
`;

const CarouselDot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.active ? props.theme.primary : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  
  &:hover {
    background: ${props => props.active ? props.theme.primary : 'rgba(255, 255, 255, 0.8)'};
  }
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 20px;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.7);
  }
  
  &.prev {
    left: 10px;
  }
  
  &.next {
    right: 10px;
  }
`;

const Details = styled.div`
  flex: 1;
  padding: 32px 36px;
  display: flex;
  flex-direction: column;
  width: 50%;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProjectName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const ProjectTagline = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 16px;
  font-weight: 500;
`;

const TechStack = styled.div`
  margin: 16px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const TechTag = styled.span`
  background: ${({ theme }) => `${theme.primary}15`};
  color: ${({ theme }) => theme.primary};
  padding: 6px 12px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    padding: 4px 10px;
    font-size: 0.75rem;
    border-radius: 20px;
  }
`;

const About = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  margin: 8px 0 auto 0;
  font-size: 1.05rem;
  height: ${props => props.expanded ? 'auto' : '80px'};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.expanded ? 'unset' : '3'};
  -webkit-box-orient: vertical;
  
  @media (max-width: 768px) {
    display: none; /* Hide on mobile */
  }
`;

const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-top: 8px;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    display: none; /* Hide on mobile */
  }
`;

const ButtonRow = styled.div`
  margin-top: 28px;
  display: flex;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const Button = styled.a`
  padding: 10px 24px;
  background: ${({ primary, theme }) => 
    primary ? theme.primary : 'transparent'};
  color: ${({ primary, theme }) => 
    primary ? '#fff' : theme.primary};
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: ${({ primary, theme }) => 
    primary ? `${theme.primary}dd` : `${theme.primary}22`};
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 20px;
    font-size: 0.95rem;
  }
`;

// Loading animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => `${theme.bg}dd`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid ${({ theme }) => `${theme.primary}33`};
  border-top: 5px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 20px;
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

const AllProjects = () => {
  const navigate = useNavigate();
  
  // State for toggle filter
  const [toggle, setToggle] = useState("all");
  
  // State for image carousels
  const [activeSlides, setActiveSlides] = useState({});
  
  // State for expanded project descriptions
  const [expandedProjects, setExpandedProjects] = useState({});
  
  // State for loading when switching filters
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // State for mobile dropdowns
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSocialDropdownOpen, setIsSocialDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const socialDropdownRef = useRef(null);
  
  // Initialize active slides and filtered projects
  useEffect(() => {
    const initialActiveSlides = {};
    projectsData.forEach(project => {
      initialActiveSlides[project.id] = 0;
    });
    
    setActiveSlides(initialActiveSlides);
    setFilteredProjects(projectsData);
  }, []);
  
  // Handle filter changes with loading state
  useEffect(() => {
    if (toggle !== "all") {
      setIsLoading(true);
      
      // Simulate loading delay for visual feedback
      const timer = setTimeout(() => {
        const filtered = projectsData.filter(project => 
          Array.isArray(project.category) && project.category.includes(toggle)
        );
        setFilteredProjects(filtered);
        setIsLoading(false);
      }, 800); // 800ms delay for loading effect
      
      return () => clearTimeout(timer);
    } else {
      setIsLoading(true);
      
      // Simulate loading delay for visual feedback
      const timer = setTimeout(() => {
        setFilteredProjects(projectsData);
        setIsLoading(false);
      }, 800); // 800ms delay for loading effect
      
      return () => clearTimeout(timer);
    }
  }, [toggle]);
  
  // Handle image navigation
  const handlePrevImage = (projectId, e) => {
    e.stopPropagation();
    const project = projectsData.find(p => p.id === projectId);
    const imageCount = project.images.length;
    
    setActiveSlides(prev => ({
      ...prev,
      [projectId]: (prev[projectId] - 1 + imageCount) % imageCount
    }));
  };
  
  const handleNextImage = (projectId, e) => {
    e.stopPropagation();
    const project = projectsData.find(p => p.id === projectId);
    const imageCount = project.images.length;
    
    setActiveSlides(prev => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % imageCount
    }));
  };
  
  const handleDotClick = (projectId, index, e) => {
    e.stopPropagation();
    setActiveSlides(prev => ({
      ...prev,
      [projectId]: index
    }));
  };
  
  // Navigate to project detail page
  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };
  
  // Toggle expanded state for project descriptions
  const toggleProjectExpand = (projectId, e) => {
    e.stopPropagation();
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };
  
  // Removed slider mouse handlers as the slider is now hidden
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (socialDropdownRef.current && !socialDropdownRef.current.contains(event.target)) {
        setIsSocialDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, socialDropdownRef]);
  
  // Get category display name
  const getCategoryDisplayName = (category) => {
    switch(category) {
      case 'all': return 'ALL Projects';
      case 'web app': return 'WEB-development';
      case 'machine learning': return 'Machine Learning';
      case 'saas': return 'SaaS Projects';
      case 'ui-ux': return 'UI/UX Designs';
      case 'web-design': return 'Web Design';
      case 'app-design': return 'App Design';
      case 'animations': return 'Animations';
      case 'case-study': return 'Case Studies';
      default: return category;
    }
  };
  
  return (
    <PageWrapper>
      <ContentContainer>
        <HeaderContainer>
          <Tagline>SaaS, ML & Creative Projects</Tagline>
          {/* Desktop Social Links */}
          <SocialLinks>
            <SocialButton href="https://github.com/sanjayattelli29" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.5 21.278 9.5 21.012C9.5 20.768 9.49 20.046 9.49 19.192C7 19.69 6.35 18.584 6.15 18.041C6.037 17.756 5.55 16.931 5.125 16.687C4.775 16.492 4.275 15.994 5.112 15.984C5.9 15.975 6.463 16.726 6.65 17.022C7.55 18.615 8.988 18.074 9.54 17.809C9.63 17.172 9.89 16.732 10.17 16.49C7.88 16.248 5.5 15.409 5.5 11.614C5.5 10.519 5.9 9.621 6.677 8.921C6.577 8.666 6.217 7.614 6.778 6.211C6.778 6.211 7.617 5.945 9.5 7.261C10.29 7.036 11.15 6.924 12 6.924C12.85 6.924 13.71 7.036 14.5 7.261C16.383 5.935 17.222 6.211 17.222 6.211C17.783 7.614 17.423 8.666 17.323 8.921C18.1 9.621 18.5 10.509 18.5 11.614C18.5 15.419 16.108 16.248 13.818 16.49C14.178 16.8 14.5 17.393 14.5 18.332C14.5 19.68 14.49 20.663 14.49 21.012C14.49 21.278 14.65 21.591 15.15 21.489C17.135 20.821 18.831 19.535 20.061 17.804C21.292 16.074 21.996 14.005 22 11.877C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
              </svg>
              GitHub
            </SocialButton>
            <SocialButton href="https://storage2.me-qr.com/pdf/02e52d21-3182-40b6-be68-a77f796cbd6b.pdf" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Resume
            </SocialButton>
            <SocialButton href="https://www.linkedin.com/in/attelli-sanjay-kumar/" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              LinkedIn
            </SocialButton>
            <SocialButton href="https://www.behance.net/attellisanjay/" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 7H14V2H22V7ZM18 4.5H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 15H2V20H6C7.10457 20 8 19.1046 8 18V17C8 15.8954 7.10457 15 6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 9H2V14H6C7.10457 14 8 13.1046 8 12V11C8 9.89543 7.10457 9 6 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 15H18C19.1046 15 20 15.8954 20 17V18C20 19.1046 19.1046 20 18 20H14V9H18C19.1046 9 20 9.89543 20 11V12C20 13.1046 19.1046 14 18 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Behance
            </SocialButton>
          </SocialLinks>
          
          {/* Mobile Social Links Dropdown */}
          <MobileSocialContainer ref={socialDropdownRef}>
            <SocialToggleButton onClick={() => setIsSocialDropdownOpen(!isSocialDropdownOpen)}>
              Connect {isSocialDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
            </SocialToggleButton>
            
            <SocialDropdown isOpen={isSocialDropdownOpen}>
              <SocialDropdownItem href="https://github.com/sanjayattelli29" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.5 21.278 9.5 21.012C9.5 20.768 9.49 20.046 9.49 19.192C7 19.69 6.35 18.584 6.15 18.041C6.037 17.756 5.55 16.931 5.125 16.687C4.775 16.492 4.275 15.994 5.112 15.984C5.9 15.975 6.463 16.726 6.65 17.022C7.55 18.615 8.988 18.074 9.54 17.809C9.63 17.172 9.89 16.732 10.17 16.49C7.88 16.248 5.5 15.409 5.5 11.614C5.5 10.519 5.9 9.621 6.677 8.921C6.577 8.666 6.217 7.614 6.778 6.211C6.778 6.211 7.617 5.945 9.5 7.261C10.29 7.036 11.15 6.924 12 6.924C12.85 6.924 13.71 7.036 14.5 7.261C16.383 5.935 17.222 6.211 17.222 6.211C17.783 7.614 17.423 8.666 17.323 8.921C18.1 9.621 18.5 10.509 18.5 11.614C18.5 15.419 16.108 16.248 13.818 16.49C14.178 16.8 14.5 17.393 14.5 18.332C14.5 19.68 14.49 20.663 14.49 21.012C14.49 21.278 14.65 21.591 15.15 21.489C17.135 20.821 18.831 19.535 20.061 17.804C21.292 16.074 21.996 14.005 22 11.877C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
                </svg>
                GitHub
              </SocialDropdownItem>
              <SocialDropdownItem href="https://storage2.me-qr.com/pdf/02e52d21-3182-40b6-be68-a77f796cbd6b.pdf" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Resume
              </SocialDropdownItem>
              <SocialDropdownItem href="https://www.linkedin.com/in/attelli-sanjay-kumar/" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                LinkedIn
              </SocialDropdownItem>
              <SocialDropdownItem href="https://www.behance.net/attellisanjay/" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 7H14V2H22V7ZM18 4.5H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 15H2V20H6C7.10457 20 8 19.1046 8 18V17C8 15.8954 7.10457 15 6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 9H2V14H6C7.10457 14 8 13.1046 8 12V11C8 9.89543 7.10457 9 6 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 15H18C19.1046 15 20 15.8954 20 17V18C20 19.1046 19.1046 20 18 20H14V9H18C19.1046 9 20 9.89543 20 11V12C20 13.1046 19.1046 14 18 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Behance
              </SocialDropdownItem>
            </SocialDropdown>
          </MobileSocialContainer>
        </HeaderContainer>
        
        {/* Mobile Dropdown for filtering */}
        <MobileFilterContainer ref={dropdownRef}>
          <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {getCategoryDisplayName(toggle)}
            {isDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
          </DropdownButton>
          
          <DropdownMenu isOpen={isDropdownOpen}>
            <DropdownItem 
              active={toggle === "all"} 
              onClick={() => {
                setToggle("all");
                setIsDropdownOpen(false);
              }}
            >
              ALL Projects
            </DropdownItem>
            <DropdownItem 
              active={toggle === "web app"} 
              onClick={() => {
                setToggle("web app");
                setIsDropdownOpen(false);
              }}
            >
              WEB-development
            </DropdownItem>
            <DropdownItem 
              active={toggle === "machine learning"} 
              onClick={() => {
                setToggle("machine learning");
                setIsDropdownOpen(false);
              }}
            >
              Machine Learning
            </DropdownItem>
            <DropdownItem 
              active={toggle === "saas"} 
              onClick={() => {
                setToggle("saas");
                setIsDropdownOpen(false);
              }}
            >
              SaaS Projects
            </DropdownItem>
            <DropdownItem 
              active={toggle === "ui-ux"} 
              onClick={() => {
                setToggle("ui-ux");
                setIsDropdownOpen(false);
              }}
            >
              UI/UX Designs
            </DropdownItem>
            <DropdownItem 
              active={toggle === "web-design"} 
              onClick={() => {
                setToggle("web-design");
                setIsDropdownOpen(false);
              }}
            >
              Web Design
            </DropdownItem>
            <DropdownItem 
              active={toggle === "app-design"} 
              onClick={() => {
                setToggle("app-design");
                setIsDropdownOpen(false);
              }}
            >
              App Design
            </DropdownItem>
            <DropdownItem 
              active={toggle === "animations"} 
              onClick={() => {
                setToggle("animations");
                setIsDropdownOpen(false);
              }}
            >
              Animations
            </DropdownItem>
            <DropdownItem 
              active={toggle === "case-study"} 
              onClick={() => {
                setToggle("case-study");
                setIsDropdownOpen(false);
              }}
            >
              Case Studies
            </DropdownItem>
          </DropdownMenu>
        </MobileFilterContainer>
        
        {/* Desktop Toggle Button Group for filtering */}
        <ToggleButtonGroup>
          <ToggleButton
            active={toggle === "all"}
            onClick={() => setToggle("all")}
          >
            ALL Projects
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "web app"}
            onClick={() => setToggle("web app")}
          >
            WEB-development
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "machine learning"}
            onClick={() => setToggle("machine learning")}
          >
            Machine Learning
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "saas"}
            onClick={() => setToggle("saas")}
          >
            SaaS Projects
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "ui-ux"}
            onClick={() => setToggle("ui-ux")}
          >
            UI/UX Designs
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "web-design"}
            onClick={() => setToggle("web-design")}
          >
            Web Design
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "app-design"}
            onClick={() => setToggle("app-design")}
          >
            App Design
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "animations"}
            onClick={() => setToggle("animations")}
          >
            Animations
          </ToggleButton>
          <Divider />
          <ToggleButton
            active={toggle === "case-study"}
            onClick={() => setToggle("case-study")}
          >
            Case Studies
          </ToggleButton>
        </ToggleButtonGroup>
        
        {isLoading && (
          <LoadingOverlay>
            <Spinner />
            <LoadingText>Loading {toggle === "all" ? "all projects" : toggle} projects...</LoadingText>
          </LoadingOverlay>
        )}
        
        <ProjectsList>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} reverse={index % 2 !== 0} >
              <ImageContainer>
                <ImageCarousel>
                  {project.images.map((image, imgIndex) => (
                    <CarouselSlide 
                      key={imgIndex} 
                      active={activeSlides[project.id] === imgIndex}
                    >
                      <Thumbnail src={image} alt={`${project.name} - Image ${imgIndex + 1}`} />
                    </CarouselSlide>
                  ))}
                  
                  {/* Navigation buttons */}
                  <CarouselButton 
                    className="prev" 
                    onClick={(e) => handlePrevImage(project.id, e)}
                    aria-label="Previous image"
                  >
                    &#10094;
                  </CarouselButton>
                  
                  <CarouselButton 
                    className="next" 
                    onClick={(e) => handleNextImage(project.id, e)}
                    aria-label="Next image"
                  >
                    &#10095;
                  </CarouselButton>
                  
                  {/* Dots indicator */}
                  <CarouselControls>
                    {project.images.map((_, dotIndex) => (
                      <CarouselDot 
                        key={dotIndex} 
                        active={activeSlides[project.id] === dotIndex}
                        onClick={(e) => handleDotClick(project.id, dotIndex, e)}
                        aria-label={`Go to image ${dotIndex + 1}`}
                      />
                    ))}
                  </CarouselControls>
                </ImageCarousel>
              </ImageContainer>
              
              <Details>
                <ProjectName>{project.name}</ProjectName>
                <ProjectTagline>{project.tagline}</ProjectTagline>
                <TechStack>
                  {project.techStack.map((tech, i) => (
                    <TechTag key={i}>{tech}</TechTag>
                  ))}
                </TechStack>
                <About expanded={expandedProjects[project.id]}>{project.about}</About>
                <ShowMoreButton onClick={(e) => toggleProjectExpand(project.id, e)}>
                  {expandedProjects[project.id] ? 'Show Less' : 'Show More'}
                </ShowMoreButton>
                <ButtonRow>
                  <Button 
                    primary 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.5 21.278 9.5 21.012C9.5 20.768 9.49 20.046 9.49 19.192C7 19.69 6.35 18.584 6.15 18.041C6.037 17.756 5.55 16.931 5.125 16.687C4.775 16.492 4.275 15.994 5.112 15.984C5.9 15.975 6.463 16.726 6.65 17.022C7.55 18.615 8.988 18.074 9.54 17.809C9.63 17.172 9.89 16.732 10.17 16.49C7.88 16.248 5.5 15.409 5.5 11.614C5.5 10.519 5.9 9.621 6.677 8.921C6.577 8.666 6.217 7.614 6.778 6.211C6.778 6.211 7.617 5.945 9.5 7.261C10.29 7.036 11.15 6.924 12 6.924C12.85 6.924 13.71 7.036 14.5 7.261C16.383 5.935 17.222 6.211 17.222 6.211C17.783 7.614 17.423 8.666 17.323 8.921C18.1 9.621 18.5 10.509 18.5 11.614C18.5 15.419 16.108 16.248 13.818 16.49C14.178 16.8 14.5 17.393 14.5 18.332C14.5 19.68 14.49 20.663 14.49 21.012C14.49 21.278 14.65 21.591 15.15 21.489C17.135 20.821 18.831 19.535 20.061 17.804C21.292 16.074 21.996 14.005 22 11.877C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
                    </svg>
                    GitHub
                  </Button>
                  <Button 
                    href={project.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM9.71 18.303C8.475 17.991 7.352 17.384 6.435 16.543C5.518 15.701 4.837 14.654 4.45 13.498C5.522 13.174 6.633 12.983 7.753 12.93L9.71 18.303ZM4.066 12.012C4.062 11.674 4.076 11.338 4.11 11C4.11 10.66 4.11 10.33 4.17 10C5.459 10.008 6.74 10.195 7.98 10.557L6.34 14.939C5.557 14.075 4.956 13.075 4.568 11.991L4.066 12.012ZM14.29 18.303L16.247 12.93C17.367 12.984 18.478 13.174 19.55 13.498C19.163 14.654 18.482 15.701 17.565 16.543C16.648 17.384 15.525 17.991 14.29 18.303ZM17.66 14.939L16.02 10.557C17.26 10.195 18.541 10.008 19.83 10C19.89 10.33 19.89 10.66 19.89 11C19.924 11.338 19.938 11.674 19.934 12.012L19.398 12C19.031 13.088 18.439 14.089 17.66 14.939ZM20 8C18.403 7.97 16.816 8.242 15.32 8.8L14.09 5.5C16.047 4.528 18.202 4.018 20.39 4C20.437 4.332 20.48 4.664 20.48 5C20.48 6.05 20.33 7 20 8ZM12 4.5C12.47 4.5 13.422 5.93 14.05 8.3C13.372 8.48 12.687 8.607 12 8.68C11.313 8.607 10.628 8.48 9.95 8.3C10.578 5.93 11.53 4.5 12 4.5ZM9.91 5.5L8.68 8.8C7.184 8.242 5.597 7.97 4 8C3.67 7 3.52 6.05 3.52 5C3.52 4.664 3.52 4.332 3.61 4C5.798 4.018 7.953 4.528 9.91 5.5ZM12 20C11.45 20 9.85 18.12 9.24 14.63C10.154 14.539 11.076 14.493 12 14.49C12.924 14.493 13.846 14.539 14.76 14.63C14.15 18.12 12.55 20 12 20ZM10.23 12.26C10.775 12.221 11.322 12.197 11.87 12.19H12.13C12.678 12.197 13.225 12.221 13.77 12.26L12.94 14.44C12.314 14.474 11.686 14.474 11.06 14.44L10.23 12.26Z" fill="currentColor"/>
                    </svg>
                    View Site
                  </Button>
                </ButtonRow>
              </Details>
            </ProjectCard>
          ))
        }
        </ProjectsList>
      </ContentContainer>
    </PageWrapper>
  );
};

export default AllProjects;