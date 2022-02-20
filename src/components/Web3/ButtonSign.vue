<template>
  <div>
    <button
      v-if="accounts.length == 0 && user == null"
      type="button"
      class="btn btn-round btn-primary"
    >
      MetaMask is installed!
    </button>
    <button
      v-if="accounts.length > 0 && user == null"
      type="button"
      class="btn btn-round btn-primary"
      @click="connectWallet"
    >
      <i class="now-ui-icons objects_planet"></i> Connect Account
    </button>
    <!-- <button
      v-if="accounts.length > 0 && user == null"
      type="button"
      class="btn btn-round btn-primary"
      @click="openFormSignUp"
    >
      <i class="now-ui-icons objects_spaceship"></i> Create Acount
    </button> -->
    <button
      v-if="accounts.length > 0 && user != null"
      type="button"
      class="btn btn-primary"
    >
      <i class="now-ui-icons shopping_credit-card"></i> {{ user.IDsteam }}
    </button>
    <button
      v-if="accounts.length > 0 && user != null"
      type="button"
      class="btn btn-round btn-primary"
      @click="signOut"
    >
      Logout
    </button>
    <!-- {{ token }} -->
    <!-- {{ user }} -->
    <!-- small modal -->
    <modal :show.sync="modals.mini" class="modal" :show-close="false">
      <!-- <div slot="header" class="modal-profile">
        <i class="now-ui-icons users_circle-08"></i>
      </div> -->
      <div slot="header" class="logo">
        <img v-lazy="'img/icon-1.png'" alt="" />
      </div>

      <fg-input
        class="no-border form-control-lg"
        addon-left-icon="now-ui-icons shopping_credit-card"
        placeholder="Address"
        v-model="form.accountAddress"
        disabled
      >
      </fg-input>

      <fg-input
        class="no-border form-control-lg"
        addon-left-icon="now-ui-icons users_circle-08"
        placeholder="ID Steam"
        v-model="form.IDsteam"
      >
      </fg-input>

      <fg-input
        class="no-border form-control-lg"
        placeholder="Email"
        addon-left-icon="now-ui-icons ui-1_email-85"
        type="email"
        v-model="form.email"
      >
      </fg-input>
      <Alert type="danger" v-if="fromErr">{{ fromErr }}</Alert>
      <n-button
        type="button"
        class="btn btn-primary"
        @click="createWallet"
        block
        round
        >SignUp</n-button
      >
    </modal>
  </div>
</template>

<script>
import { Button, Modal, FormGroupInput, Card, Alert } from "@/components";
import { Popover, Tooltip, DatePicker } from "element-ui";
import Web3 from "web3";
import Decimal from "decimal.js";
import { setIntervalAsync } from "set-interval-async/fixed";
import { clearIntervalAsync } from "set-interval-async";
import { each, map, reverse } from "lodash";
import { BigNumber } from "bignumber.js";
import { assetList } from "./assetList.js";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  components: {
    Modal,
    // Card,
    Alert,
    [Button.name]: Button,
    [Popover.name]: Popover,
    [Tooltip.name]: Tooltip,
    [DatePicker.name]: DatePicker,
    [FormGroupInput.name]: FormGroupInput,
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
      form: {
        email: "anusondd@gmail.com",
        IDsteam: "76561198253103559",
        accountAddress: "",
      },
      fromErr: "",
    };
  },
  mounted() {
    this.getAccounts();
    this.timer = setIntervalAsync(this.getAccounts, 5000);
    this.changeAccounts();
  },
  watch: {
    accounts(newVal) {
      // console.log('watch',newVal);
    },
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
      signUpWeb3: "auth/signUpWeb3",
      signInWeb3: "auth/signInWeb3",
      signOut: "auth/signOut",
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
      let params = {accountAddress:this.accounts[0]}
      // console.log('connectWallet',params)
      try {
        let res = await this.signInWeb3(params);
        if (res) {
          this.openFormSignUp();
        }
      } catch (error) {
        // console.error(error.message);
      }
    },
    openFormSignUp() {
      this.modals.mini = true;
      this.form = {
        email: "",
        IDsteam: "",
        accountAddress: this.accounts[0],
      };
    },
    async createWallet() {
      let params = this.form;
      // console.log("createWallet", params);
      if (this.form.email == "") {
        this.fromErr = "required email";
      }
      if (this.form.IDsteam == "") {
        this.fromErr = "required ID steam";
      }
      try {
        if ((this.form.email != "", this.form.IDsteam != "")) {
          let res = await this.signUpWeb3(params);
          if (res) {
            this.fromErr = res;
          } else {
            this.fromErr = null;
            this.modals.mini = false;
          }
        }
      } catch (error) {
        this.fromErr = error;
        // this.modals.mini = false;
        // console.error(error.message);
      }
    },
  },
};
</script>

<style lang="scss">
#javascriptComponents {
  .modal-buttons,
  .popover-buttons,
  .tooltip-buttons {
    .btn + .btn {
      margin-left: 3px;
    }
  }
}
</style>