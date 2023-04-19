import { Component } from "react";
import styled from "styled-components";

const Avatar = styled.img`
    border-radius: 100%;
    width: 64px;
`
const UserInformation = styled.div`
    width: 100%;
`

const UserItem = styled.li`
  align-items: center;
  background: rgb(50,52,80);
  background: linear-gradient(180deg, rgba(50,52,80,1) 0%, rgba(24,25,39,1) 100%); 
  border-bottom: 1px solid #9e9e9e;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-size: 14px;
  gap:24px;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 720px;
  padding: 16px 24px;
  width: 100%;
`

class User extends Component {
  render() {

    const user = this.props.user

    return (
      <UserItem>
        <Avatar src={user.img} />
        <UserInformation>
          <p>{user.name}</p>
          <p>ID: {user.id} - Username: {user.username}</p>
        </UserInformation>
        <div>
          <button>Pagar</button>
        </div>
      </UserItem>
    )
  }
}

export default User