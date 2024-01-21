<template>
    <div class="text-center py-4">
        <span v-if="status != 'OPEN'">Loading...</span>
        <span v-else>Urls Shortened: {{ parsedData?.shortens }}</span>
    </div>
</template>


<script setup lang="ts">
import { useEventSource } from '@vueuse/core'

const { status, data } = useEventSource('/api/shortens');
const parsedData = computed(() => JSON.parse(data.value!));
</script>
