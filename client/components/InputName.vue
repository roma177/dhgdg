<template>
  <v-text-field
    v-model.trim="value"
    :error-messages="[].concat(errors, externalErrors)"
    :name="name"
    type="text"
    label="Name"
    @blur="validate"
  />
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
import InputMixin from "@/mixins/InputMixin";
import { minLengthMessage, requiredMessage } from "@/helpers";
/**
 * Name input for auth forms.
 * @version 1.0.0
 */
export default {
  name: "InputName",
  mixins: [InputMixin],
  data: () => ({
    name: "name"
  }),
  validations: {
    value: { required, minLength: minLength(2) }
  },
  methods: {
    validate () {
      this.errors = [];
      if (!this.$v.value.minLength) {
        this.errors.push(
          minLengthMessage("Name", this.$v.value.$params.minLength.min)
        );
      }
      if (!this.$v.value.required) {
        this.errors.push(requiredMessage("Name"));
      }
    }
  }
};
</script>
<docs>
  ### Usage example
  ```js
  <InputName
    :id="itemId"
    :model="ItemModel"
    :external-errors="APIErrors"
    @error="inputErrorStateChange"
  />
  ```
</docs>
