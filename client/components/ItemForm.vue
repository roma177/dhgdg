<template>
  <div>
    <v-alert
      v-if="alertMessage"
      :value="alertMessage !== null"
      :type="alertType"
      transition="scale-transition"
      @click="hideAlert"
    >
      {{ alertMessage }}
    </v-alert>
    <v-form
      class="px-5 py-4"
      name="sell"
    >
      <InputTitle
        :id="id"
        ref="title"
        :external-errors="titleAPIErrors"
        @error="inputErrorStateChange"
        @focus="hideAlert"
      />
      <InputArtist
        :id="id"
        ref="artist"
        :external-errors="artistAPIErrors"
        @error="inputErrorStateChange"
        @focus="hideAlert"
      />
      <InputYear
        :id="id"
        ref="year"
        :external-errors="yearAPIErrors"
        @error="inputErrorStateChange"
        @focus="hideAlert"
      />
      <InputImage
        :id="id"
        ref="image"
        :external-errors="imageAPIErrors"
        @error="inputErrorStateChange"
        @focus="hideAlert"
      />
      <InputPrice
        :id="id"
        ref="price"
        :external-errors="priceAPIErrors"
        @error="inputErrorStateChange"
        @focus="hideAlert"
      />
      <v-btn
        name="submit"
        color="blue-grey darken-4 white--text"
        class="elevation-0 mx-0"
        @click="save"
      >
        Save
      </v-btn>
    </v-form>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import InputTitle from "@components/InputTitle";
import InputArtist from "@components/InputArtist";
import InputYear from "@components/InputYear";
import InputImage from "@components/InputImage";
import InputPrice from "@components/InputPrice";
import { TEMP_ITEM_ID } from "@/constants";
export default {
  name: "ItemForm",
  components: {
    InputTitle,
    InputArtist,
    InputYear,
    InputImage,
    InputPrice
  },
  mixins: [validationMixin],
  data: () => ({
    alertType: null,
    alertMessage: null,
    titleAPIErrors: [],
    titleErrorState: false,
    artistAPIErrors: [],
    artistErrorState: false,
    yearAPIErrors: [],
    yearErrorState: false,
    imageAPIErrors: [],
    imageErrorState: false,
    priceAPIErrors: [],
    priceErrorState: false
  }),
  computed: {
    id () {
      return this.$route.params.id || TEMP_ITEM_ID;
    }
  },
  methods: {
    inputErrorStateChange (type, state) {
      this[`${type}ErrorState`] = state;
    },
    sendData () {
      //
    },
    successCallback (id) {
      //
    },
    errorCallback () {
      this.showAlert(
        "error",
        "There has been an error with your submission. Please try again."
      );
    },
    async save () {
      this.$refs.title.validate();
      this.$refs.artist.validate();
      this.$refs.year.validate();
      this.$refs.image.validate();
      this.$refs.price.validate();
      await this.$nextTick();
      if (
        !this.titleErrorState &&
        !this.artistErrorState &&
        !this.yearErrorState &&
        !this.imageErrorState &&
        !this.priceErrorState
      ) {
        try {
          const { id } = await this.sendData();
          this.successCallback(id);
        } catch (err) {
          this.errorCallback();
        }
      }
    },
    showAlert (type, message) {
      this.alertType = type;
      this.alertMessage = message;
    },
    hideAlert () {
      this.alertMessage = null;
    }
  }
};
</script>