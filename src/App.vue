<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n';


const { locale, t } = useI18n(); // Access the translation function

</script>

<template>
  <RouterView />
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { locale } = useI18n(); // Reactive locale
    const changeLanguage = (event) => {
      locale.value = event.target.value; // Update the language
    };

    return {
      locale,
      changeLanguage,
    };
  },
};
</script>