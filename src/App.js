import './App.css';
import React, {Component} from "react";
import Web3 from "web3";
import Header from "./components/Header";
import Main from "./components/Main";
import Marketplace from "./abis/Marketplace.json";
import {
  Dimmer,
  Loader
} from "semantic-ui-react";

class App extends Component {

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    // Modern dapp browsers...
    if (typeof window.ethereum !== 'undefined') {
      // Load Web3
      window.web3 = new Web3(window.ethereum)
      window.ethereum.autoRefreshOnNetworkChange = false;
    } else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const ethereum = window.ethereum
    // Load account
    const accounts = await ethereum.request({method: 'eth_requestAccounts'})
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if(networkData) {
      const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })
      const productCount = await marketplace.methods.productCount().call({ from: this.state.account })
      this.setState({ productCount })
      // Load products
      for (let i = 1; i<= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      this.setState({ loading: false })
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }
  }

  createProduct = (name, price) => {
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }

  purchaseProduct = (id, price) => {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }

  render() {
    return (
      <div className="App">
        <Header account={this.state.account} />
        <div id="content" style={{marginTop: '50px'}}>
          { this.state.loading
            ? <Dimmer active inverted><Loader>Loading...</Loader></Dimmer>
            : <Main
                products={this.state.products}
                createProduct={this.createProduct}
                purchaseProduct={this.purchaseProduct}
              />
          }
        </div>
      </div>
    );
  }
}

export default App;
