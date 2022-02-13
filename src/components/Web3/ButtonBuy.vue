<template>
  <div>
    <button v-if="user == null" type="button" class="btn btn-round btn-primary">
      <i class="now-ui-icons objects_planet"></i>
      Connect Account
    </button>
    <button
      v-if="user != null"
      type="button"
      class="btn btn-round btn-primary"
      @click="buyNow"
    >
      Buy Now ({{ tokenSymbo }})
    </button>
    <!-- {{accounts}} -->
    <!-- {{user}} -->
    <!-- small modal -->
    <modal
      :show.sync="modals.mini"
      class="modal-danger"
      :show-close="false"
      headerClasses="justify-content-center"
      type="mini"
    >
      <div slot="header" class="modal-profile">
        <i class="now-ui-icons users_circle-08"></i>
      </div>
      <p>Always have an access to your profile</p>
      <template slot="footer">
        <!-- <n-button type="neutral" link>Back</n-button> -->
        <n-button type="neutral" link @click="modals.mini = false"
          >Close</n-button
        >
      </template>
    </modal>
  </div>
</template>

<script>
import { setIntervalAsync } from "set-interval-async/fixed";
import { mapActions, mapState, mapGetters } from "vuex";
import web3js from "web3";
import { BigNumber } from "bignumber.js";
import Decimal from "decimal.js";
import { Button, Modal, FormGroupInput } from '@/components';
// For BSC20 transfers.
let minABI = [
  // transfer
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    type: "function",
  },
];
const assetList = {
  BBL: {
    symbol: "BBL",
    name: "Babylon",
    type: "BSC20",
    decimals: 18,
    balance: 0,
    address: "0x9B5583917465Af00bB6b6E15AceF8BDFe8f766c0",
  },
  LHZ: {
    symbol: "LHZ",
    name: "Log Horizon",
    type: "BSC20",
    decimals: 18,
    balance: 0,
    address: "0x8663aA6e3EF6E3A3C6A169dBa44Cd8C096D2Bc18",
  },
  BUSD: {
    symbol: "BUSD",
    name: "Binance-Peg BUSD Token",
    type: "BSC20",
    decimals: 18,
    balance: 0,
    address: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
  },
};

export default {
  components:{
     Modal,
  },
  props: {
    tokenSymbo: {
      type: String,
    },
    tokenAmount: {
      type: Number,
    },
    itemName: {
      type: String,
    },
    itemAmount: {
      type: Number,
    },
  },
  data() {
    return {
      modals: {
        classic: false,
        mini: false,
      },
      pickers: {
        datePicker: "",
      },
      // Wallet
      accounts: [],
      activeAccount: null,
      errorMessage: "",
      timer: null,
    };
  },
  mounted() {
    this.getAccounts();
    this.timer = setIntervalAsync(this.getAccounts, 5000);
    this.changeAccounts();
  },
  computed: {
    ...mapState({
      token: (state) => state.auth.token,
    }),
    ...mapGetters({
      user: "auth/getAuth",
    }),
  },
  methods: {
    ...mapActions({
      signInWeb3: "auth/signInWeb3",
      addTrasaction: "order/addTrasaction",
      confirmTransaction: "order/confirmTransaction",
    }),
    async getAccounts() {
      try {
        if (!window.ethereum) {
          // console.log("MetaMask is installed!");
        }
        // const web3 = new Web3(Web3.givenProvider)
        // this.accounts = await  web3.eth.getAccounts()
        this.accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // console.log("accounts", this.accounts);
      } catch (error) {
        // console.error(error.message);
      }
    },
    async changeAccounts() {
      try {
        if (!window.ethereum) {
          // console.log("MetaMask is installed!");
        }
        // const web3 = new Web3(Web3.givenProvider)
        // this.accounts = await  web3.eth.getAccounts()
        window.ethereum.on("accountsChanged", function (accounts) {
          // Time to reload your interface with accounts[0]!
          this.accounts = accounts;
          // this.connectWallet()
        });
        // console.log("accounts", this.accounts);
      } catch (error) {
        // console.error(error.message);
      }
    },
    async connectWallet() {
      let params = { accountAddress: this.accounts[0] };
      console.log("connectWallet", params);
      try {
        let res = await this.signInWeb3(params);
        if (res) {
          this.openFormSignUp();
        }
      } catch (error) {
        // console.error(error.message);
      }
    },
    async buyNow() {
      let params = {
        accountAddress: this.accounts[0],
        IDsteam: this.user.IDsteam,
        tokenSymbo: this.tokenSymbo,
        tokenAmount: this.tokenAmount,
        itemName: this.itemName,
        itemAmount: this.itemAmount,
      };
      try {
        const asset = assetList[this.tokenSymbo];
        let balance = await this.getBalanceToken(asset.address);
        if (balance > this.tokenAmount) {
          // let _id = await this.addTrasaction(params);
          let _id = await this.sendAsset();
        }else{
          this.modals.mini = true
        }
      } catch (error) {
        console.error(error);
      }
    },
    async sendAsset() {
      const sendTo = "0xA41ACC8d7B0dC1890d7aaFDd4f88311c4996bf61";
      const fromAddress = this.accounts[0];
      const asset = assetList[this.tokenSymbo];
      // const contract = new web3js.eth.Contract(minABI, asset.address);
      // const gasPrice = web3js.utils.toWei("0.00000000105", "ether");
      console.log("asset", asset, this.tokenSymbo, fromAddress);
      const decimals = web3js.utils.toBN(asset.decimals);
      const amount = new BigNumber(this.tokenAmount);
      const value = amount.multipliedBy(web3js.utils.toBN(10).pow(decimals));
      try {
        const web3 = new web3js(web3js.givenProvider);
        let contract = new web3.eth.Contract(minABI, asset.address);
        contract.methods
          .transfer(sendTo, value)
          .send({ from: fromAddress })
          .on("transactionHash", function (hash) {
            console.log(hash);
          });
      } catch (error) {
        console.error(error);
      }
    },
    validNetwork() {
      return window.ethereum.chainId === "0x2710";
    },
    async getBalanceToken(contractAddress) {
      const fromAddress = this.accounts[0];
      var web3 = new web3js(web3js.givenProvider);
      let getBalance = await web3.eth.call({
        to: contractAddress,
        data:
          web3js.utils.sha3("balanceOf(address)").slice(0, 10) +
          "000000000000000000000000" +
          web3js.utils.stripHexPrefix(fromAddress),
        returnType: "uint256",
      });
      let balance = new Decimal(web3js.utils.fromWei(getBalance));
      console.log("balance", balance.toString());
      return +balance.toString();
    },
  },
};
</script>

<style>
</style>