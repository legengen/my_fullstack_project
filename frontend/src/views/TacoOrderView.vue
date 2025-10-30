<template>
    <form action="">
        <div v-for="item in background">

        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
const background = ref([
    'name', 
    'street',
    'city',
    'state',
    'zip'
])
</script>