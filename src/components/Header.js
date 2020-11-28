import React, {Component} from 'react'
import {
  Container,
  Image,
  Menu,
} from 'semantic-ui-react'

class Header extends Component {
  render() {
    return (
      <div>
        <Menu fixed='top'>
          <Container>
            <Menu.Item as='a' header>
              <Image size='mini' src='./logo.svg' style={{marginRight: '1.5em'}}/>
              HT Marketplace
            </Menu.Item>
            <Menu.Item as='a'>Home</Menu.Item>

            <Menu.Item position='right'>
              {this.props.account}
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    )
  }
}

export default Header
