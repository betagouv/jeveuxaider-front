<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <button
      class="el-dropdown-link text-xs flex-none rounded-full px-3 py-1 my-4 sm:my-0 border hover:border-black transition !outline-none focus:border-black text-black"
    >
      Filtres
    </button>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :command="{ status: 1 }"
        :class="{ active: status == 1 }"
        class="font-light"
      >
        Conversations actives
      </el-dropdown-item>
      <el-dropdown-item
        :command="{ status: 0 }"
        :class="{ active: status == 0 }"
        class="font-light"
      >
        Conversations archivées
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      status: 1,
    }
  },
  methods: {
    handleCommand(command) {
      if (!command) {
        return
      }
      this.$emit('update', command)
    },
  },
}
</script>
