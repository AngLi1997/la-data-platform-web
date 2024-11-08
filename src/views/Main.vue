<script setup lang="ts">
import { ElMenu } from 'element-plus';
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import type { LaMenuType  } from '../components/menu/LaMenuType';
import LaSubMenu from '@/components/menu/LaSubMenu.vue';

const menus = ref([] as LaMenuType[])

menus.value = [{
        id:"1",
        label:"系统管理",
        icon:"system",
        children:[{
            id:"11",
            label:"用户管理",
            icon:"user",
            path: "/system/user",
            children:[]
        },{
            id:"12",
            label:"角色管理",
            icon:"role",
            path: "/system/role",
            children:[]
        },{
            id:"13",
            label:"权限管理",
            icon:"permission",
            path: "/system/permission",
            children:[]
        },{
            id:"14",
            label:"菜单管理",
            icon:"menu",
            path: "/system/menu",
            children:[]
        }]
    },{
        id:"2",
        label:"运维管理",
        icon:"pm",
        children:[{
            id:"21",
            label:"数据源管理",
            icon:"pm",
            path: "/om/datasource",
            children:[]
        },{
            id:"22",
            label:"接口管理",
            icon:"pm",
            path: "/om/api",
            children:[]
        },{
            id:"23",
            label:"服务管理",
            icon:"pm",
            path: "/om/service",
            children:[]
        },{
            id:"24",
            label:"文档管理",
            icon:"pm",
            path: "/om/doc",
            children:[]
        }]
    },{
        id:"3",
        label:"流程管理",
        icon:"pm",
        children:[{
            id:"31",
            label:"流程配置",
            icon:"pm",
            path: "/process/processConfig",
            children:[]
        },{
            id:"32",
            label:"表单管理",
            icon:"pm",
            path: "/process/formConfig",
            children:[]
        }]
    }
]

</script>

<template>
    <div id="content">
        <div id="menu">
            <el-menu>
                <la-sub-menu :menus="menus"></la-sub-menu>
            </el-menu>
        </div>
        <div id="nav">
            <router-view/>
        </div>
    </div>
</template>

<style scoped>
#topbar {
    height: 70px;
}
#content {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    height: calc(100vh - 20px);
}
#menu {
    width: 250px;
    margin-right: 10px;
    flex-grow: 0;
}
#nav {
    flex-grow: 1;
}
.p-menu-item-content {
    margin: 10px;
}
</style>