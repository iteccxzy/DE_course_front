<template>
  <div class="container">
    <search-component></search-component>
    <div class="row"><div class="col"></div></div>
    <last-component></last-component>
  </div>
</template>

<script>
import LastComponent from "@/components/lastComponent.vue";
import SearchComponent from "@/components/searchComponent.vue";

export default {
  name: "contentComponent",
  components: {
    SearchComponent,
    LastComponent,
  },
};
</script>
    