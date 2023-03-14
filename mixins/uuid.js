// We must not rely on _uid
// https://github.com/vuejs/vue/issues/5886#issuecomment-308625735

let uuid = 0

export default {
  beforeCreate () {
    this.uuid = uuid.toString()
    uuid += 1
  }
}
