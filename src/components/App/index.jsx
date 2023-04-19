import { Component } from "react";
import styled from "styled-components";

import User from "../User";
import Connection from "../Connection";

const UserList = styled.ul`
  background-color: #f0f;
  box-sizing: border-box;
  max-width: 768px;
  min-width: 360px;
  padding: 2px;
  width: 100%;
`

class App extends Component {

  state = {
    users: []
  }

  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    try {
      const connection = new Connection()
      const users = await connection.userData()
      const sortedUsers = users.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      })
      this.setState({ users: sortedUsers })
    } catch (error) {
      console.log("componentDidMount:", error);
    }
  }

  render() {

    const userList = this.state.users.map(user => <User user={user} key={user.id} />)
    
    return (
      <UserList>
        {userList}
      </UserList>
    )
  }

}

export default App
