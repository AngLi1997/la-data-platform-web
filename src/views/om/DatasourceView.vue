<template>
    <div id="content-view">
        <div id="content-view-top">
            <div>
                <ElInput placeholder="搜索数据库名称" icon="Search" style="width: 200px;" v-model="databaseNameSearchKey"
                    clearable>
                    <template #prefix>
                        <ElIcon>
                            <Search />
                        </ElIcon>
                    </template>
                </ElInput>
            </div>
            <div>
                <ElButton type="primary" icon="Plus" @click="showCreateDatabase">创建数据源</ElButton>
                <ElButton icon="Refresh" @click="getDatabaseList(databaseNameSearchKey)">查询</ElButton>
            </div>
        </div>
        <div id="content-view-main">
            <ElTable :data="datasource" columns="columns" :border="true">
                <ElTableColumn prop="databaseName" label="数据源名称" />
                <ElTableColumn prop="databaseType" label="数据库类型" />
                <ElTableColumn prop="host" label="主机" width="100" />
                <ElTableColumn prop="port" label="端口" width="70" />
                <ElTableColumn prop="username" label="数据库用户名" />
                <ElTableColumn prop="schemaName" label="库名" />
                <ElTableColumn prop="status" label="状态" width="100" />
                <ElTableColumn prop="updateTime" label="最后更新时间" width="200" />
                <ElTableColumn prop="updateUser" label="更新人" />
                <ElTableColumn prop="remark" label="备注" />
                <ElTableColumn label="操作" width="70">
                    <template #default="scope">
                        <ElDropdown trigger="click">
                            <ElButton link type="primary">操作</ElButton>
                            <template #dropdown>
                                <ElDropdownMenu>
                                    <ElDropdownItem @click="() => {
                                        detailData = scope.row;
                                        detailVisiable = true;
                                    }">查看详情</ElDropdownItem>
                                    <ElDropdownItem @click="showEditDatabase(scope.row.id)">编辑</ElDropdownItem>
                                    <ElDropdownItem @click="testConnect(scope.row.id)">测试连接</ElDropdownItem>
                                    <ElDropdownItem>
                                        <template #default>
                                            <ElButton link type="danger" @click="deleteDatabasesConfig(scope.row.id)">删除
                                            </ElButton>
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
    <ElDialog title="数据源" v-model="formVisiable" destroy-on-close>
        <LaForm ref="formRef" :forms="formFields" v-model:data="formData" />
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="formVisiable = false">取消</el-button>
                <el-button v-if="isCreate" type="primary" @click="saveDatabase">保存</el-button>
                <el-button v-else type="primary" @click="editDatabase">保存编辑</el-button>
            </div>
        </template>
    </ElDialog>
    <ElDialog title="数据源" v-model="detailVisiable" destroy-on-close>
        <ElDescriptions :border="true">
            <ElDescriptionsItem label="数据源名称">{{ detailData.databaseName }}</ElDescriptionsItem>
            <ElDescriptionsItem label="数据库类型">{{ detailData.databaseType }}</ElDescriptionsItem>
            <ElDescriptionsItem label="主机">{{ detailData.host }}</ElDescriptionsItem>
            <ElDescriptionsItem label="端口">{{ detailData.port }}</ElDescriptionsItem>
            <ElDescriptionsItem label="数据库用户名">{{ detailData.username }}</ElDescriptionsItem>
            <ElDescriptionsItem label="库名">{{ detailData.schemaName }}</ElDescriptionsItem>
            <ElDescriptionsItem label="状态">{{ detailData.status }}</ElDescriptionsItem>
            <ElDescriptionsItem label="最后更新时间">{{ detailData.updateTime }}</ElDescriptionsItem>
            <ElDescriptionsItem label="更新人">{{ detailData.updateUser }}</ElDescriptionsItem>
            <ElDescriptionsItem label="备注">{{ detailData.remark }}</ElDescriptionsItem>
        </ElDescriptions>
    </ElDialog>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { ElTable, ElTableColumn, ElDropdown, ElDropdownItem, ElDropdownMenu, ElButton, ElInput, ElIcon, ElDialog, ElMessage, ElMessageBox, ElDescriptions, ElDescriptionsItem, type FormInstance } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import LaForm from '@/components/form/LaForm.vue';
import laAxois from '@/api/LaAxios';
import type { SelectOption } from '@/components/form/SelectOption';
import { tr } from 'element-plus/es/locales.mjs';

const formRef = ref()

const formData = ref();

const datasourceTypeList = ref<SelectOption[]>([]);

const formFields = ref([{
    type: 'input',
    label: '数据源名称',
    prop: 'databaseName',
    placeholder: '请输入数据源名称',
    rules: [{
        required: true,
        message: '请输入数据源名称',
        trigger: 'blur'
    }]
}, {
    type: 'select',
    options: datasourceTypeList,
    label: '数据库类型',
    prop: 'databaseDriverId',
    placeholder: '请选择数据源类型',
    rules: [{
        required: true,
        message: '请选择数据源类型',
        trigger: 'change'
    }]
}, {
    type: 'input',
    label: '主机',
    prop: 'host',
    defaultValue: '127.0.0.1',
    placeholder: '请输入主机地址',
    rules: [{
        required: true,
        message: '请输入主机地址',
        trigger: 'blur'
    }]
}, {
    type: 'number',
    label: '端口',
    prop: 'port',
    placeholder: '请输入端口号',
    rules: [{
        required: true,
        message: '请输入端口号',
        trigger: 'blur'
    }]
}, {
    type: 'input',
    label: '用户名',
    prop: 'username',
    placeholder: '请输入数据源用户名'
}, {
    type: 'password',
    label: '密码',
    prop: 'password',
    placeholder: '请输入数据源密码'
}, {
    type: 'input',
    label: '数据库名',
    prop: 'schemaName',
    placeholder: '请输入数据库名称',
    rules: [{
        required: true,
        message: '请输入数据库名称',
        trigger: 'blur'
    }]
}, {
    type: 'textarea',
    label: '备注',
    prop: 'remark',
    placeholder: '请输入备注'
}])

const datasource = ref([]);

const formVisiable = ref(false);

const detailVisiable = ref(false);

const isCreate = ref(true);

const detailData = ref();

const databaseNameSearchKey = ref();

const loadDatabaseType = () => {
    laAxois.get('/database/type/list').then((res: any) => {
        datasourceTypeList.value = res.data.map((item: any) => {
            return {
                key: item.id,
                label: item.driverClassName ? item.name + " | " + item.driverClassName : item.name,
                value: item.id
            }
        });
    });
}

const showCreateDatabase = () => {
    isCreate.value = true;
    formVisiable.value = true;
}

const showEditDatabase = (databaseId: string) => {
    isCreate.value = false;
    laAxois.get('/database/config/detail', { databaseId: databaseId }).then((res: any) => {
        formVisiable.value = true;
        nextTick(() => {
            formRef.value.setFormData(res.data);
        });
    });
}

const saveDatabase = () => {
    formRef.value
        .submit()
        .then((res: any) => {
            laAxois.post('/database/config/create', { ...res.data, status: 'NORMAL' })
                .then((res: any) => {
                    formVisiable.value = false;
                    getDatabaseList();
                })
        })
}

const editDatabase = () => {
    formRef.value
        .submit()
        .then((res: any) => {
            laAxois.post('/database/config/edit', { ...res.data, status: 'NORMAL' })
                .then((res: any) => {
                    formVisiable.value = false;
                    getDatabaseList();
                })
        })
}

const getDatabaseList = (databaseName?: string) => {
    laAxois.post('/database/config/list', {
        databaseName: databaseNameSearchKey.value
    }).then((res: any) => {
        datasource.value = res.data;
    })
}

const deleteDatabasesConfig = (databaseId: string) => {
    // 确认删除
    ElMessageBox.confirm("确定删除该数据源吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        laAxois.delete('/database/config/delete', {
            databaseId: databaseId
        }).then((res: any) => {
            ElMessage.success("删除成功");
            getDatabaseList();
        })
    })
}

const testConnect = (databaseId: string) => {
    laAxois.get('/database/config/testConnect', {
        databaseId: databaseId
    }).then((res: any) => {
        if (res.data) {
            ElMessage.success("连接成功");
        } else {
            ElMessage.error("连接失败");
        }
    });
}


onMounted(() => {
    getDatabaseList()
    loadDatabaseType();
})

</script>
<style scoped></style>