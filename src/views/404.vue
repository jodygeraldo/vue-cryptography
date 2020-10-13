<template>
  <div>
    <b-card title="404 - Page not found">
      <b-card-text>
        Oops! The page you are looking for is not found.
      </b-card-text>

      <b-card-text>
        You can go back by clicking on the navigation above or click on button
        below.
      </b-card-text>

      <b-link class="card-link" :to="{ name: 'Classic' }">Go back</b-link>
    </b-card>
  </div>
</template>
