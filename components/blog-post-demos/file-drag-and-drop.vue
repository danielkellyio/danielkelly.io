<template>
  <div>
    <label>
      Color
      <select v-model="color">
        <option value="blue">blue</option>
        <option value="red">red</option>
        <option value="yellow">yellow</option>
        <option value="green">green</option>
        <option value="indigo">indigo</option>
        <option value="purple">purple</option>
        <option value="pink">pink</option>
        <option value="gray">gray</option>
      </select>
    </label>

    <label>
      <input v-model="multiple" type="checkbox" />
      Multiple
    </label>

    <FileDragAndDrop :color="color" :multiple="multiple" />
  </div>
</template>
<script>
export default {
  components: {
    FileDragAndDrop: () => import('./components/FileDragAndDrop'),
  },
  data() {
    return {
      color: 'gray',
      multiple: false,
    }
  },
}
</script>
