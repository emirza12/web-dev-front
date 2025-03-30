<script lang="ts" setup>
defineProps<{
    label: string;
    id: string;
    type: string;
    modelValue: string;
}>();
</script>

<template>
    <div class="input-container">
        <label :for="id" class="input-label">{{ label }}</label>
        <input 
            class="input-field"
            :type="type"
            :id="id"
            :value="modelValue"
            @input="$emit('update:model-value', ($event.target as HTMLInputElement).value)" />
    </div>
</template>

<style scoped>
.input-container {
    margin-bottom: 1.5rem;
    position: relative;
    width: 100%;
}

.input-label {
    display: block;
    font-size: 1.1rem;
    color: #f3f4f6;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.input-field {
    width: 100%;
    padding: 16px;
    font-size: 1.1rem;
    color: #f3f4f6;
    background-color: #333;
    border-color: #5c6bc0;
    border-radius: 10px;
    transition: all 0.3s ease;
    outline: none;
    box-sizing: border-box;
}

.input-field:focus {
    border-color: #5c6bc0;
    background-color: #2a2a2a;
}

.input-field::placeholder {
    color: #a1a1a1;
}

.input-field:disabled {
    background-color: #444;
    border-color: #666;
    cursor: not-allowed;
}
</style>
