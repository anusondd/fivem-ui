<template>
  <div>
    <button
      v-if="accounts.length==0"
      type="button"
      class="btn btn-round btn-primary"
    >
      MetaMask is installed!
    </button>
    <button
      v-if="accounts.length>0"
      type="button"
      class="btn btn-round btn-primary"
      @click="sign()"
    >
      <i class="now-ui-icons shopping_credit-card"></i> {{accounts[0]}}
    </button>
  </div>
</template>

<script>
import { Button, Modal, FormGroupInput } from "@/components";
import { Popover, Tooltip, DatePicker } from "element-ui";
import Web3 from "web3";
import Decimal from "decimal.js";
import { setIntervalAsync } from "set-interval-async/fixed";
import { clearIntervalAsync } from "set-interval-async";
import { each, map, reverse } from "lodash";
import { BigNumber } from "bignumber.js";
import { assetList } from "./assetList.js";

// For SEP20 transfers.
const minABI = [
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

export default {
  name: "btnsign",
  components: {
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
      errorMessage:"",
      timer: null,
    };
  },
  mounted() {
    this.getAccounts()
    this.timer = setIntervalAsync(this.getAccounts, 5000);
  },
  methods: {
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
    async sign() {
      try {
        if (!window.ethereum) {
          // console.log("MetaMask is installed!");
        }
        this.accounts
      } catch (error) {
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