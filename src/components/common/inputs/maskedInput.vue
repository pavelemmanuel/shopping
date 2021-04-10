<template>
    <div class="form-group">
        <label class="control-label">
            {{ label }}
            <span v-show="isRequired" class="text-danger"> * </span>
        </label>
        <input
            :value="value" @input="$emit('input', $event.target.value)"
            class="form-control" :class="{' is-invalid' : errors.first(name) }"
            v-mask="mask" :data-vv-as="label"
            :name="name" v-validate="rules"
        />
        <small class="invalid-feedback">{{ errors.first(name)}}</small>
    </div>
</template>

<script>
    export default {
        name: 'maskedInput',
        inject: ['$validator'],
        props: ['label', 'name', 'value', 'rules', 'isRequired', 'mask']
    }
</script>
