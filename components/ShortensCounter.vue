<template>
    <div class="text-center py-4">
    <span v-if="pending">Loading...</span>
    <span v-else>Urls Shortened: {{ data?.shortens }}</span>
    </div>
</template>


<script setup>
const { pending, data } = useLazyFetch('/api/shortens');
</script>
