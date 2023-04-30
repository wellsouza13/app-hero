import styled from 'styled-components';

export const TableContainer = styled.div`
  background: rgb(255, 255, 255);
  border: 1px solid rgb(229, 229, 229);
  border-radius: 11px;
  overflow: hidden;

`;

export const DashboardContainer = styled.div`
  padding: 150px;
`;

export const HeaderTablelContainer = styled.div`
 display: flex;
 justify-content: space-between;
`

export const Title = styled.h3 ``

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;

  background: rgb(255, 255, 255);
  border: 1px solid rgb(229, 229, 229);
  border-radius: 11px;

  padding: 15px;
`;

export const FormLabel = styled.label`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
`;

export const FormInput = styled.input`
  margin-bottom: 20px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const FormSelect = styled.div`
  margin-bottom: 20px;
  width: 50%;
`;

export const FormCheckbox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const FormButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff0000;
  margin-top: -10px;
  margin-bottom: 10px;
`;