<template >
  <Head>
    <Title>urlshort.gdwr.me</Title>
    <Meta name="description" content="Url shortener" />
  </Head>
  
  <div class="w-screen h-screen dark:bg-gray-900">
    <LightSwitch />

    <UNotifications />
    <main class="flex flex-col">
      <div class="flex flex-col mx-auto my-80">
          <h1 class="text-primary text-4xl p-8 underline md:text-6xl"> urlshort.gdwr.me </h1>
          <UButtonGroup size="xl" orientation="horizontal" class="mx-auto">
              <UInput placeholder="Enter your url here!" v-model="url" />
              <UTooltip text="Create shortend URL" >
                  <UButton icon="i-heroicons-plus" color="gray" @click="createUrl()" />
              </UTooltip>
          </UButtonGroup>
        <ShortensCounter />
      </div>
    </main>

    <footer class="flex">
      <a class="m-auto link underline text-primary" href="https://github.com/gdwr/urlshort"> See the source </a>
    </footer>
  </div>
</template>

<script setup lang="ts">
const url = ref("");
const toast = useToast();

async function createUrl() {
  var response = await $fetch<{url: string}>("/api/shorten", {
    method: "POST",
    body: JSON.stringify({
      url: url.value,
    }),
    onResponseError: async (context) => {
      var body = await context.response._data;
      var errors = body.error;
      toast.add({
        title: 'Error!',
        color: 'red',
        description: errors[0].message,
      });
    },
  });

  toast.add({
    title: 'Url Shortened!',
    color: 'green',
    actions: [
      {label: 'Copy', click: () => navigator.clipboard.writeText(response.url) },
      {label: 'Goto', click: () => window.open(response.url, '_blank') },
    ]
  });
}
</script>