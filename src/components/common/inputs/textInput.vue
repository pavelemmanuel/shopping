<template>
  <div class="form-group">
      <label class="control-label">{{ label }} <span v-show="isRequired" class="text-danger">*</span></label>
      <input
          :type="(type) ? type : 'text'" :value="value" @input="$emit('input', $event.target.value)"
          class="form-control" :class="{' is-invalid' : errors.first(name) }"
          v-validate="rules" :name="name" :data-vv-as="label"
      >
      <small class="invalid-feedback">{{ errors.first(name) }}</small>
  </div>
</template>

<script>
  export default {
    name: 'textInput',
    inject: ['$validator'],
    props: ['label', 'name', 'value', 'rules', 'isRequired', 'type']
  }
</script>
