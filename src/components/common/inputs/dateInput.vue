<template>
    <div class="form-group">
        <label class="control-label">{{ label }} <span v-show="isRequired" class="text-danger">*</span></label>
        <input
            :type="(type) ? type : 'text'" 
            class="form-control" :class="{' is-invalid' : errors.first(name) }"
            v-validate="rules" :name="name" :data-vv-as="label"
        >
        <datepicker 
            :bootstrap-styling="true" 
            :value="value" @input="$emit('input', $event.target.value)"
            :language="fr" 
            :monday-first="true" :format="customFormatter" 
        >
        </datepicker>
        <small class="invalid-feedback">{{ errors.first(name) }}</small>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import {fr} from 'vuejs-datepicker/dist/locale';
    export default {
        name: 'dateInput',
        inject: ['$validator'],
        props: ['label', 'name', 'value', 'rules', 'isRequired'],
        components: {
            Datepicker
        },
    }
</script>
