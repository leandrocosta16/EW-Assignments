<template>
  <v-app>
    <v-content>
      <ListCrosswalks />
    </v-content>
  </v-app>
</template>

<script>
import ListCrosswalks from './components/ListCrosswalks';

export default {
  name: 'App',

  components: {
    ListCrosswalks,
  }
};
</script>
