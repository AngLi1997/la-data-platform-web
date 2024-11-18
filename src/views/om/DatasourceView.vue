<template>
    <div id="content-view">
        <div id="content-view-top">
            <ElInput placeholder="搜索" icon="Search" style="width: 200px;">
                <template #prefix>
                    <ElIcon>
                        <Search/>
                    </ElIcon>
                </template>
            </ElInput>
            <div>
                <ElButton type="primary" icon="Plus" @click="createDatasource">创建数据源</ElButton>
                <ElButton icon="Refresh">刷新查询</ElButton>
            </div>
        </div>
        <div id="content-view-main">
            <ElTable :data="datasource" style="width: 100%; height: 100%;" columns="columns" :border="true" >
            <ElTableColumn prop="name" label="数据源名称"/>
            <ElTableColumn prop="type" label="数据源类型"/>
            <ElTableColumn prop="host" label="主机"/>
            <ElTableColumn prop="port" label="端口"/>
            <ElTableColumn prop="username" label="数据库用户名"/>
            <ElTableColumn prop="schema" label="库名"/>
            <ElTableColumn prop="status" label="状态"/>
            <ElTableColumn label="操作">
                <template #default="scope">
                    <ElDropdown trigger="click">
                        <ElButton link type="primary">操作</ElButton>
                        <template #dropdown>
                            <ElDropdownMenu>
                                <ElDropdownItem>查看详情</ElDropdownItem>
                                <ElDropdownItem>编辑</ElDropdownItem>
                                <ElDropdownItem>激活</ElDropdownItem>
                                <ElDropdownItem>测试连接</ElDropdownItem>
                                <ElDropdownItem>进入Shell</ElDropdownItem>
                                <ElDropdownItem>
                                    <template #default>
                                        <ElButton link type="danger">删除</ElButton>
                                    </template>
                                </ElDropdownItem>
                            </ElDropdownMenu>
                        </template>
                    </ElDropdown>
                </template>
            </ElTableColumn>
        </ElTable>
        </div>
    </div>
    <ElDialog title="数据源" v-model="formVisiable">
        <LaForm ref="formRef" :forms="formFields" v-model:data="formData"/>
        <template #footer>
            <div class="dialog-footer">
                <el-button>取消</el-button>
                <el-button type="primary" @click="saveDatasource">保存</el-button>
            </div>
        </template>
    </ElDialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { ElTable, ElTableColumn, ElDropdown, ElDropdownItem, ElDropdownMenu, ElButton, ElInput, ElIcon, ElDialog, type FormValidateCallback } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import LaForm from '@/components/form/LaForm.vue';
import laAxois from '@/api/LaAxios';
import type { SelectOption } from '@/components/form/SelectOption';

const formRef = ref();

const formData = ref();

const datasourceTypeList = ref<SelectOption[]>([]);

const formFields = ref([{
    type: 'input',
    label: '数据源名称',
    prop: 'name',
    placeholder: '请输入数据源名称',
    rules: [{
        required: true,
        message: '请输入数据源名称',
        trigger: 'blur'
    }]
},{
    type: 'select',
    options: datasourceTypeList,
    label: '数据源类型',
    prop: 'type',
    placeholder: '请选择数据源类型'
},{
    type: 'input',
    label: '主机',
    prop: 'host',
    placeholder: '请输入主机地址'
},{
    type: 'number',
    label: '端口',
    prop: 'port',
    placeholder: '请输入端口号'
},{
    type: 'input',
    label: '用户名',
    prop: 'username',
    placeholder: '请输入数据源用户名'
},{
    type: 'password',
    label: '密码',
    prop: 'password',
    placeholder: '请输入数据源密码'
},{
    type: 'input',
    label: '数据库名',
    prop: 'schema',
    placeholder: '请输入数据库名称'
}])

const datasource = ref([{
    id: 1,
    name: '默认数据源',
    type: 'MySQL8.0',
    host: 'localhost',
    port: '3306',
    username: 'root',
    schema: 'test',
    status: '正常'
},{
    id: 2,
    name: '全文搜索数据源',
    type: 'ElasticSearch7.17',
    host: 'localhost',
    port: '5601',
    username: 'elasticsearch',
    schema: 'test',
    status: '连接失败'
}]);

const formVisiable = ref(false);

const createDatasource = () => {
    formVisiable.value = true;
    laAxois.get('/datasource/type/list').then((res: any) => {
        datasourceTypeList.value = res.data.map((item: any) => {
            return {
                key: item.id,
                label: item.name + " | " + item.driverClassName,
                value: item.id
            }
        });
    })
}

const saveDatasource = () => {
    formRef.value
        .submit()
        .then((res: any) => {
            console.log(res);
        }).catch((err: any) => {
            console.log(err);
        })
}

</script>
<style scoped>

</style>