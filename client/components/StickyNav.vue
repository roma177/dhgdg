<template>
  <v-toolbar
    dense
    dark
    fixed
    flat
    height="50px"
    color="pink darken-2"
  >
    <div v-if="$auth.check()">
      Hi {{ $auth.user().name }}! <a
        id="logout"
        href=""
        class="blue-grey--text text--darken-4"
        @click.prevent="logOut"
      >Logout</a>
    </div>
    <div v-else>
      Hi! <router-link
        id="login"
        :to="{ name: ROUTE_NAME_LOGIN }"
        class="blue-grey--text text--darken-4"
      >
        Sign in
      </router-link> or <router-link
        id="register"
        :to="{ name: 'register' }"
        class="blue-grey--text text--darken-4"
      >
        register
      </router-link>.
    </div>
    <v-spacer />
    <v-btn
      v-if="!$auth.check('admin')"
      :to="{ name: ROUTE_NAME_CART }"
      icon
    >
      <v-badge
        left
        color="secondary"
      >
        <span
          v-if="cartItems"
          id="cart-qty"
          slot="badge"
          class="text--white"
        >{{ cartItems }}</span>
        <v-icon>shopping_cart</v-icon>
      </v-badge>
    </v-btn>
  </v-toolbar>
</template>
<script>
import {
  ROUTE_NAME_LOGIN,
  ROUTE_NAME_CART,
  CART_COUNT
} from "@/constants";
import Item from "@/store/models/Item";

/**
 * Sticky navigation bar.
 * @version 1.0.0
 */
export default {
  name: "StickyNav",
  data: () => ({
    search: null,
    ROUTE_NAME_LOGIN,
    ROUTE_NAME_CART
  }),
  computed: {
    cartItems () {
      return this.$store.getters[`entities/items/${CART_COUNT}`];
    }
  },
  methods: {
    logOut () {
      Item.update({
        where: () => true,
        data: { cart: 0 }
      });
      this.$auth.logout();
    }
  }
};
</script>
<docs>
  ### Usage example
  #### Logged out
  ```js
  <StickyNav />
  ```
  #### Logged in
  ```js
  // Mock Vue Auth
  import Vue from "vue";
  Vue.prototype.$auth = {
    check: () => true,
    user: () => ({ name: "George" })
  };
  <StickyNav />
  ```
</docs>
