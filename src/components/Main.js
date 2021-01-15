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
                {
                  this.props.products.map((product, key) => {
                    return (
                      <Table.Row key={key}>
                        <Table.Cell>{ product.id.toString() }</Table.Cell>
                        <Table.Cell>{ product.name }</Table.Cell>
                        <Table.Cell>{ window.web3.utils.fromWei(product.price, 'Ether') } Eth</Table.Cell>
                        <Table.Cell>{ product.owner }</Table.Cell>
                        <Table.Cell>
                          { !product.purchased ?
                          <Button
                            primary
                            onClick={() => {
                              this.props.purchaseProduct(product.id, product.price)
                            }}
                          >Buy</Button>
                          : "Already sold..." }
                        </Table.Cell>
                      </Table.Row>
                    )
                  })
                }
              </Table.Body>
            </Table>
          </Container>
      </div>
    )
  }
}

export default Header
