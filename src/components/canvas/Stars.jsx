import React from "react";
import styled, { keyframes } from "styled-components";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AnimatedBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  inset: 0;
  background: linear-gradient(270deg, rgb(16, 23, 37), rgb(9, 9, 23), rgb(9, 9, 24), rgb(9, 10, 26));
  background-size: 400% 400%;
  animation: ${gradientAnimation} 10s ease infinite;
`;

const SimpleBackground = () => {
  return <AnimatedBackground />;
};

export default SimpleBackground;
