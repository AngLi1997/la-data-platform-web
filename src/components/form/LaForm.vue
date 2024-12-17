<script setup lang="ts">   
import { ElInputNumber, ElInput, ElSelect, ElForm, ElFormItem } from 'element-plus';
import type { FormInstance } from 'element-plus';
import type { LaFormFieldType } from './LaFromFieldType'; 
import { reactive, ref, watch } from 'vue';

interface FormData {
    [key: string]: any;
}

interface ValidatedFormData {
    validated: boolean;
    data: FormData;
    error?: any;
    
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

const submit = (): Promise<ValidatedFormData> => {
    if (!formRef.value) {
        return Promise.reject<ValidatedFormData>({
            validated: false,
            formData: formData
        });
    }
    return formRef.value?.validate()
        .then((valid: boolean) => {
            if (valid){
                return new Promise<ValidatedFormData>((resolve, reject) => {
                    resolve({
                        validated: true,
                        data: formData
                    })
                })
            } else {
                return Promise.reject<ValidatedFormData>({
                        validated: false,
                        formData: formData
                    })
            }
        }).catch((err: any) => {
            return Promise.reject<ValidatedFormData>({
                        validated: false,
                        formData: formData,
                        error: err
                    })
        })
}

const setFormData = (data: FormData) => {
    Object.assign(formData, data)
}

const setDefaultValues = () => {
    props.forms.forEach(item => {
        if (item.defaultValue) {
            formData[item.prop] = item.defaultValue;
        }
    })
}

defineExpose({ submit, setFormData })

setDefaultValues()

</script>
<template>
    <ElForm label-width="auto" ref="formRef" :model="formData">
        <ElFormItem v-for="(item, index) in forms" :key="index" :label="item.label" :prop="item.prop" :rules="item.rules">
            <ElInput v-if="item.type === 'input'" :placeholder="item.placeholder" v-model="formData[item.prop]"></ElInput>
            <ElSelect v-if="item.type === 'select'" :placeholder="item.placeholder" v-model="formData[item.prop]">
                <ElOption v-for="op in item.options" :key="op.key" :value="op.value" :label="op.label">{{ op.label }}</ElOption>
            </ElSelect>
            <ElInput :show-password="false" v-if="item.type === 'password'" :placeholder="item.placeholder" v-model="formData[item.prop]"></ElInput>
            <ElInputNumber v-if="item.type === 'number'" v-model="formData[item.prop]"></ElInputNumber>
            <ElInput type="textarea" :rows="2" v-if="item.type === 'textarea'" :placeholder="item.placeholder" v-model="formData[item.prop]"></ElInput>
        </ElFormItem>
    </ElForm>
</template>
<style scoped>

</style>