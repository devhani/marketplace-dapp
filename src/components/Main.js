import React, {Component} from 'react'
import {
  Container,
  Form,
  Button,
  Table
} from 'semantic-ui-react'

class Header extends Component {
  render() {
    return (
      <div>
          <Container>
            <h1>Add Products</h1>
            <Form onSubmit={(event) => {
              event.preventDefault()
              const name = this.productName.value
              const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
              this.props.createProduct(name, price)
            }}>
              <Form.Field>
                <input
                  id="productName"
                  type="text"
                  ref={(input) => { this.productName = input }}
                  className="form-control"
                  placeholder="Product Name"
                  required />
              </Form.Field>
              <Form.Field>
                <input
                  id="productPrice"
                  type="text"
                  ref={(input) => { this.productPrice = input }}
                  className="form-control"
                  placeholder="Product Price"
                  required />
              </Form.Field>
              <Button type="submit" className="btn btn-primary">Add Product</Button>
            </Form>

            <h2>Buy Product</h2>
            <Table basic='very' celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell collapsing>#</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Owner</Table.HeaderCell>
                  <Table.HeaderCell collapsing/>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>1</Table.Cell>
                  <Table.Cell>iPhone x</Table.Cell>
                  <Table.Cell>1 Eth</Table.Cell>
                  <Table.Cell>0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9</Table.Cell>
                  <Table.Cell><Button primary>Buy</Button></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>2</Table.Cell>
                  <Table.Cell>Macbook Pro</Table.Cell>
                  <Table.Cell>3 eth</Table.Cell>
                  <Table.Cell>0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9</Table.Cell>
                  <Table.Cell><Button primary>Buy</Button></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>3</Table.Cell>
                  <Table.Cell>Airpods</Table.Cell>
                  <Table.Cell>0.5 eth</Table.Cell>
                  <Table.Cell>0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9</Table.Cell>
                  <Table.Cell><Button primary>Buy</Button></Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Container>
      </div>
    )
  }
}

export default Header
