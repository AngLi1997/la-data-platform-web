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
                <ElButton type="primary" icon="Plus">创建数据源</ElButton>
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
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { ElTable, ElTableColumn, ElDropdown, ElDropdownItem, ElDropdownMenu, ElButtonGroup, ElButton, ElInput, ElIcon } from 'element-plus';
import { Search } from '@element-plus/icons-vue';

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
</script>
<style scoped>

</style>