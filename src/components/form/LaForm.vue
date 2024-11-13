<script setup lang="ts">   
import { ElInputNumber, ElInput, ElSelect, ElForm, ElFormItem } from 'element-plus';
import type { FormInstance, FormValidateCallback } from 'element-plus';
import type { LaFormFieldType } from './LaFromFieldType'; 
import { reactive, ref, watch } from 'vue';

interface FormData {
    [key: string]: any;
}

const props = defineProps({
    forms: {
            type: Array as () => LaFormFieldType[],
            default: () => []
        },
    data: {
        type: Object,
        default: () => reactive<FormData>({})
    }
})
const formRef = ref<FormInstance>();
const formData = reactive<FormData>({
    
})
const emit = defineEmits(['update:data'])

watch(formData, () => {
    emit('update:data', formData)
});

const validate = (callback: FormValidateCallback) => {
    return formRef.value?.validate(callback);
}

defineExpose({ validate })

</script>
<template>
    <ElForm label-width="auto" ref="formRef" :model="formData">
        <ElFormItem v-for="(item, index) in forms" :key="index" :label="item.label" :prop="item.prop" :rules="item.rules">
            <ElInput v-if="item.type === 'input'" :placeholder="item.placeholder" v-model="formData[item.prop]"></ElInput>
            <ElSelect v-if="item.type === 'select'" :placeholder="item.placeholder" v-model="formData[item.prop]"></ElSelect>
            <ElInput :show-password="false" v-if="item.type === 'password'" :placeholder="item.placeholder" v-model="formData[item.prop]"></ElInput>
            <ElInputNumber v-if="item.type === 'number'" v-model="formData[item.prop]"></ElInputNumber>
        </ElFormItem>
    </ElForm>
</template>
<style scoped>

</style>