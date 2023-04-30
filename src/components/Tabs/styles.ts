import styled from 'styled-components';

export const TabsContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const TabLink = styled.div<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  text-decoration: none;
  color: ${({ active }) => (active ? 'blue' : 'black')};

  &:hover {
    text-decoration: underline;
  }
`;