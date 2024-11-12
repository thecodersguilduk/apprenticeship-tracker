<template>
    <img class="h-10 w-auto" :src="logo" alt="Apprenticeship Tracker App from The Coders Guild" />
</template>

<script>
import logo from '@/assets/img/logo/TCG_Square_Logo_Blue.svg';

export default {
    name: "Logo",
    setup() {
        return {
            logo,
        };
    },
};
</script>