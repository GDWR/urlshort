<template>
    <div class="text-center py-4">
    <ol>
        
         <li v-for="id in data?.shortens">
            <a :href="`/url/${id}`">
            {{ id }}
            </a>
        </li>
        
    </ol>
    </div>
</template>


<script setup>
const { pending, data } = useLazyFetch('/api/shortens');
</script>
