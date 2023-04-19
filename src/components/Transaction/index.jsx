import { Component } from "react";
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
  max-width: 720px;
  min-width: 360px;
  width: 90%;
`

const Header = styled.div`
  background-color: #474a6e;
  color: #fff;
  padding: 8px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const UserName = styled.span`
  color: #c5ce40;
  font-weight: bold;
`

class Transaction extends Component {

  state = {
    showModal: false
  }

  constructor(props) {
    super(props)
    this.handleModal = this.handleModal.bind(this)
  }

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal })
    const html = document.querySelector("html")
    const body = document.querySelector("body")
    if (!html.style.overflow || !body.style.overflow) {
      html.style.overflow = "hidden"
      body.style.overflow = "hidden"
      body.scroll = "no"
      html.scroll = "no"
    } else {
      html.style.overflow = null
      body.style.overflow = null
      html.scroll = null
      body.scroll = null
    }
  }

  render() {

    const user = this.props.user

    return (
      <>
        <div>
          <button onClick={this.handleModal}>Pagar</button>
        </div>
        <Modal show={this.state.showModal}>
          <ModalContent>
            <Header>
              <h3>Pagamento para <UserName>{user.name}</UserName></h3>
              <button onClick={this.handleModal}>x</button>
            </Header>
            <form>form</form>
          </ModalContent>
        </Modal>
      </>
    )
  }
}

export default Transaction