import styled from "styled-components";

export const ContainerWrapperStyled = styled.section<{ ref: any }>`
  width: 100%;
  border-radius: 11px;
  max-height: 500px;
  overflow: scroll;
`;

export const EmptyWrapperStyled = styled.div<{ containerHeight?: number }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: ${({ containerHeight }) => containerHeight || 400}px;
  .iconBox {
    margin-bottom: 10px;
  }
  strong {
    display: block;
    font-size: 16px;
    line-height: 19px;
  }
  span {
    display: block;
    font-size: 12px;
    line-height: 16px;
  }
`;

export const LoadingWrapperStyled = styled(EmptyWrapperStyled)``;

export const TableWrapper = styled.table`
  position: relative;
  table-layout: fixed;
  width: 100%;
  /* min-width: 950px; */
  @media (max-width: 1080px) {
    min-width: 950px;
  }
  @media (max-width: 720px) {
    min-width: 950px;
  }
  background-color: white;
  &.dark {
    color: white;
  }
  thead {
    tr {
      th {
        text-align: left;
        z-index: 1;
        background-color: white;
        &.dark {
          background-color: black;
        }
        &.fixed {
          position: sticky;
          top: 0;
        }
        padding: 24px 24px;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
  tbody {
    tr {
      &:nth-child(odd) {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }
`;

interface BodyTdProps {
  disabled?: boolean;
}

export const BodyTdStyled = styled.td<BodyTdProps>`
  position: relative;
  padding: 18px 24px;
  font-size: 14px;
  line-height: 20px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  white-space: nowrap;
`;

export const TableBottomContainerStyled = styled.div`
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const DisabledOutlineContainerStyled = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  height: 100%;
  width: 100%;
  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: red;
  }
  
`;

export const CollapseContent = styled.div`
  padding: 16px;
  background-color: #f7f7f7;
  border-top: 1px solid #e5e5e5;
`;

export const CollapseItem = styled.p`
  margin: 0 0 10px 0;
  line-height: 1.5;
  color: #333;
`;

export const CollapseTitle = styled.strong`
  margin-right: 5px;
  color: #555;
`;