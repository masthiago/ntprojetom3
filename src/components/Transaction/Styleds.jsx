import styled from "styled-components"

const Modal = styled.div`
    align-items: center;
    backdrop-filter: blur(2px);
    background-color:#00000050;
    box-sizing: border-box;
    color: #000;
    display: ${(props) => props.show ? `fixed` : `none`};
    height: 100%;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
`

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 16px;
  max-width: 720px;
  min-width: 360px;
  width: 90%;
`

const Header = styled.div`
  align-items: center;
  background-color: #474a6e;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 32px 8px;
  width: 100%;
`

const UserName = styled.span`
  color: #c5ce40;
  font-weight: bold;
`
const StyledForm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  padding: 64px;
`

const InputGroup = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 4px;
  padding: 4px;
  width: 50%;
  @media screen and (max-width:480px) {
    width: 90%;
  }
`

const ButtonGroup = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 16px;
  padding: 4px;
  width: 100%;
`

const FormMessageError = styled.p`
  color: #8b0000;
  font-size: 12px;
`

const FinalMessage = styled.div`
  box-sizing: border-box;
  margin: 16px;
  padding: 16px;
  text-align: center;
  width: 90%;
`

const Strong = styled.strong`
  font-weight: bold;
`
export {
  ButtonGroup,
  FinalMessage,
  FormMessageError,
  Header,
  InputGroup,
  Modal,
  ModalContent, 
  Strong,
  StyledForm,
  UserName,
}