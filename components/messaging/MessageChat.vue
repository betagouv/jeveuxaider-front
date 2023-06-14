<template>
  <div>
    <div>Message content:{{ message.content }}</div>
    <div>Message created_at:{{ $dayjs(message.created_at).format('D MMM HH[h]mm') }}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
