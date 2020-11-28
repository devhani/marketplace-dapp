import './App.css';
import {Component} from "react";
import Web3 from "web3";
import Header from "./components/Header";
import Marketplace from "./abis/Marketplace.json";

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
      console.log(marketplace)
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

  render() {
    return (
      <div className="App">
        <Header account={this.state.account} />
        <div style={{marginTop: '50px'}}>Hi !</div>
      </div>
    );
  }
}

export default App;
