<script setup lang="js">
const posts = await queryContent('blog')
    .sort({ slug: 'asc'})
    .find()

function getSlugFromPath(path) {
  const cleanPath  = removeTrailingSlash(path);
  const parts = cleanPath.split("/");
  return parts[parts.length - 1];
}

function removeTrailingSlash(inputString) {
  if (inputString.endsWith("/")) {
    return inputString.slice(0, -1);
  }
  return inputString;
}

</script>

<template>
  <Container class="mt-16 sm:mt-32">
    <!-- about page div -->
    <div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
      <ul>
        <li v-for="post in posts">
          {{getSlugFromPath(post._path)}}
        </li>
      </ul>
    </div>
  </Container>
</template>