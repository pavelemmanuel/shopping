<template>
    <div>
        <div class="form-group">
            <label class="control-label">{{ label }} <span v-show="isRequired" class="text-danger">*</span></label>
            <textarea
                :value="value" @input="$emit('input', $event.target.value)"
                class="form-control" :class="{' is-invalid' : errors.first(name) }"
                v-validate="rules" :name="name" :data-vv-as="label"
                cols="40" rows="5"
            ></textarea>
            <small class="invalid-feedback">{{ errors.first(name) }}</small>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'textareaInput',
        inject: ['$validator'],
        props: ['label', 'name', 'value', 'rules', 'isRequired', 'type']
    }
</script>
