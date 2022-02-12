<template>
  <div>
    <button v-if="user == null" type="button" class="btn btn-round btn-primary">
      <i class="now-ui-icons objects_planet"></i>
      Connect Account
    </button>
    <button v-if="user != null" type="button" class="btn btn-round btn-primary">
      Buy Now
    </button>
    <!-- {{accounts}} -->
    <!-- {{user}} -->
  </div>
</template>

<script>
import { setIntervalAsync } from "set-interval-async/fixed";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  props: {
    tokenSymbo: {
      type: String,
      default: "BUSD",
    },
    tokenAmount: {
      type: Number,
      default: 100,
    },
    itemName: {
      type: String,
      default: "gacha_02",
    },
    itemAmount: {
      type: Number,
      default: 100,
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
  },
};
</script>

<style>
</style>