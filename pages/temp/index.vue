<template>
  <div class="space-y-4 max-w-lg">
    <BaseInput v-model="form.firstname" name="firstname" label="Prénom" placeholder="Votre prénom" />
    <BaseInput v-model="form.lastname" name="lastname" label="Nom" placeholder="Votre nom" />
    <BaseInput v-model="form.email" name="email" label="Email" placeholder="Votre email" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {}
    }
  }
}
</script>
