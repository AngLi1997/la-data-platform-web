<script setup lang="ts">   
import { ElInputNumber, ElInput, ElSelect, ElForm, ElFormItem } from 'element-plus';
import type { FormInstance } from 'element-plus';
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
    },
    ref: {
        type: Object,
        default: () => ref<FormInstance>()
    }
})
const formRef = ref<FormInstance>();
const formData = reactive<FormData>({
    
})
const emit = defineEmits(['update:data'])

watch(formData, () => {
    emit('update:data', formData)
});

const getValue = () => {
    formRef.value?.validate(valid => {
        if(valid) {
            emit('update:data', formData)
        }
    })
}

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