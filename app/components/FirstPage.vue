<template>
  <ListView for="person in jsonToDisplay">
    <v-template>
      <Label
        v-bind:text="person.first_name + ' ' + person.last_name"
        textWrap="true"
        class="listViewLabel"
      />
    </v-template>
  </ListView>
</template>

<script>
export default {
  props: {
    jsonToDisplay: {
      type: Object,
    },
  },
}
</script>

<style lang="scss" scoped>
.listViewLabel {
  padding: 10px;
  margin: 10px;
}
</style>