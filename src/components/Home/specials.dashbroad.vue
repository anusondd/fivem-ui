<template>
  <div style="position: relative" class="sp-container">
    <div>
      <!-- container for the upcoming specials -->
      <p class="font-2 weight-600 text-center">Special Package</p>
      <br />

      <v-row no-gutters align="center" justify="center">
        <v-col cols="12" xl="4" lg="4" />
        <v-col cols="12" xl="4" lg="4">
          <div class="p-2 tab">
            <specialTabVue
              @updateValue="updateTab($event)"
              :tab="tab"
              :tabs="tabs"
            />
          </div>
        </v-col>
        <v-col cols="12" xl="4" lg="4" />
      </v-row>
      <br />

      <v-container>
        <v-row v-if="tab == 1" no-gutters>
          <v-col
            cols="12"
            v-for="i in specials.USDT"
            :key="i[i + 1]"
            xl="4"
            lg="4"
          >
            <specialCardVue :info="i" />
          </v-col>
        </v-row>
        <v-row v-else-if="tab == 2" no-gutters>
          <v-col
            cols="12"
            v-for="i in specials.BUSD"
            :key="i[i + 1]"
            xl="4"
            lg="4"
          >
            <specialCardVue :info="i" />
          </v-col>
        </v-row>
        <v-row v-else no-gutters>
          <v-col
            cols="12"
            v-for="i in specials.LHZ"
            :key="i[i + 1]"
            xl="4"
            lg="4"
          >
            <specialCardVue :info="i" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import searchSpecialHomeVue from "./search.special.home.vue";
import specialCardVue from "./utilities/special.card.vue";
import specialTabVue from "./utilities/special.tab.vue";

export default {
  data() {
    return {
      specials: {
        USDT: [
          {
            img: require("../../assets/images/package/nemo.png"),
            date: "14 FEB 2022",
            tag: "Beginer",
            title: "Nemo",
            price: 700,
            duration: "10 item",
            data: {
              tokenSymbo: "USDT",
              tokenAmount: 50,
              itemName: "gacha_02",
              itemAmount: 10,
            },
          },
          {
            img: require("../../assets/images/package/shark.png"),
            date: "18 JUN 2022",
            tag: "Professional",
            title: "Shark",
            price: 400,
            duration: "4 Days, 3 Nights",
            data: {
              tokenSymbo: "USDT",
              tokenAmount: 300,
              itemName: "gacha_02",
              itemAmount: 100,
            },
          },
          {
            img: require("../../assets/images/package/whale.png"),
            date: "22 DEC 2022",
            tag: "Expert",
            title: "Whale",
            price: 340,
            duration: "7 Days, 6 Nights",
            data: {
              tokenSymbo: "USDT",
              tokenAmount: 1000,
              itemName: "gacha_02",
              itemAmount: 300,
            },
          },
        ],
        BUSD: [
          {
            img: require("../../assets/images/package/nemo.png"),
            date: "14 FEB 2022",
            tag: "Beginer",
            title: "Nemo",
            price: 700,
            duration: "10 item",
            data: {
              tokenSymbo: "BUSD",
              tokenAmount: 50,
              itemName: "gacha_02",
              itemAmount: 10,
            },
          },
          {
            img: require("../../assets/images/package/shark.png"),
            date: "18 JUN 2022",
            tag: "Professional",
            title: "Shark",
            price: 400,
            duration: "4 Days, 3 Nights",
            data: {
              tokenSymbo: "BUSD",
              tokenAmount: 300,
              itemName: "gacha_02",
              itemAmount: 100,
            },
          },
          {
            img: require("../../assets/images/package/whale.png"),
            date: "22 DEC 2022",
            tag: "Expert",
            title: "Whale",
            price: 340,
            duration: "7 Days, 6 Nights",
            data: {
              tokenSymbo: "BUSD",
              tokenAmount: 1000,
              itemName: "gacha_02",
              itemAmount: 300,
            },
          },
        ],
        LHZ: [
          {
            img: require("../../assets/images/package/nemo.png"),
            date: "14 FEB 2022",
            tag: "Beginer",
            title: "Nemo",
            price: 700,
            duration: "10 item",
            data: {
              tokenSymbo: "LHZ",
              tokenAmount: 50,
              itemName: "gacha_02",
              itemAmount: 10,
            },
          },
          {
            img: require("../../assets/images/package/shark.png"),
            date: "18 JUN 2022",
            tag: "Professional",
            title: "Shark",
            price: 400,
            duration: "4 Days, 3 Nights",
            data: {
              tokenSymbo: "LHZ",
              tokenAmount: 300,
              itemName: "gacha_02",
              itemAmount: 100,
            },
          },
          {
            img: require("../../assets/images/package/whale.png"),
            date: "22 DEC 2022",
            tag: "Expert",
            title: "Whale",
            price: 340,
            duration: "7 Days, 6 Nights",
            data: {
              tokenSymbo: "LHZ",
              tokenAmount: 1000,
              itemName: "gacha_02",
              itemAmount: 300,
            },
          },
        ],
      },
      tab: 1,
      tabs: {
        USDT: 1,
        BUSD: 2,
        LHZ: 3,
      },
      sw: 1,
    };
  },
  methods: {
    updateTab(value) {
      this.tab = value;
    },
  },
  components: {
    specialTabVue,
    specialCardVue,
    // searchSpecialHomeVue,
  },
};
</script>

<style>
.sp-container {
  padding: 4%;
}
.tab {
  margin: 0 10%;
  background: #ffffff;
  height: 8vh;
  border-radius: 13px;
}
.sh-container {
  position: absolute;
  top: -15%;
  width: 100%;
}
@media screen and (max-width: 600px) {
  .sh-container {
    position: absolute;
    top: -3em;
    width: 90% !important;
  }
  .hide-xs {
    display: none !important;
  }
}
</style>