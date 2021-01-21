<template>
  <div class="flex gap-2 flex-wrap">
    <div class="w-full md:w-1/5 flex-grow">
      <label class="block">
        <strong>Color</strong>
        <select v-model="color" class="block">
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

      <br />

      <label class="block">
        <strong>Multiple</strong>
        <div>
          <input v-model="multiple" type="checkbox" />
          Enabled
        </div>
      </label>
    </div>
    <div class="w-full md:w-3/4">
      <FileDragAndDrop :color="color" :multiple="multiple" />
    </div>
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
