<template>
    <div class="form-group">
        <label class="control-label">{{ label }} <span v-show="isRequired" class="text-danger">*</span></label>
        <select
            :value="value" @input="$emit('input', $event.target.value)"
            class="custom-select form-control" :class="{' is-invalid' : errors.first(name) }"
            v-validate="rules" :name="name" :data-vv-as="label"
        >
            <option value="">--</option>
            <option :value="option.id" v-for="(option, key) in options" :key="key">{{ option.name }}</option>
        </select>
        <small class="invalid-feedback">{{ errors.first(name) }}</small>
    </div>
</template>

<script>
    export default {
        name: 'selectInput',
        inject: ['$validator'],
        props: ['label', 'name', 'value', 'rules', 'isRequired', 'options']
    }
</script>
