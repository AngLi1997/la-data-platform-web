<script setup lang="ts">
import { ElMenu } from 'element-plus';
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import type { LaMenuType  } from '../components/menu/LaMenuType';
import LaSubMenu from '@/components/menu/LaSubMenu.vue';

const menus = ref([] as LaMenuType[])

const collapse = ref(false)

menus.value = [{
        id:"3",
        label:"流程管理",
        icon:"VideoPlay",
        children:[{
            id:"32",
            label:"表单编辑",
            icon:"Tickets",
            path: "/process/formConfig",
            children:[]
        }]
    }
]

// menus.value = [{
//         id:"1",
//         label:"系统管理",
//         icon:"Setting",
//         children:[{
//             id:"11",
//             label:"用户管理",
//             icon:"User",
//             path: "/system/user",
//             children:[]
//         },{
//             id:"12",
//             label:"角色管理",
//             icon:"Avatar",
//             path: "/system/role",
//             children:[]
//         },{
//             id:"13",
//             label:"权限管理",
//             icon:"View",
//             path: "/system/permission",
//             children:[]
//         },{
//             id:"14",
//             label:"菜单管理",
//             icon:"MessageBox",
//             path: "/system/menu",
//             children:[]
//         }]
//     },{
//         id:"2",
//         label:"运维管理",
//         icon:"Operation",
//         children:[{
//             id:"21",
//             label:"数据源管理",
//             icon:"Connection",
//             path: "/om/datasource",
//             children:[]
//         },{
//             id:"22",
//             label:"接口管理",
//             icon:"Link",
//             path: "/om/api",
//             children:[]
//         },{
//             id:"23",
//             label:"服务管理",
//             icon:"MostlyCloudy",
//             path: "/om/service",
//             children:[]
//         },{
//             id:"24",
//             label:"文档管理",
//             icon:"Document",
//             path: "/om/doc",
//             children:[]
//         }]
//     },{
//         id:"3",
//         label:"流程管理",
//         icon:"VideoPlay",
//         children:[{
//             id:"31",
//             label:"流程配置",
//             icon:"Finished",
//             path: "/process/processConfig",
//             children:[]
//         },{
//             id:"32",
//             label:"表单管理",
//             icon:"Tickets",
//             path: "/process/formConfig",
//             children:[]
//         }]
//     }
// ]

</script>

<template>
    <ElContainer>
        <ElAside width="200px">
            <ElMenu :collapse="collapse">
                <LaSubMenu :menus="menus">
                    
                </LaSubMenu>
            </ElMenu>
        </ElAside>
        <ElContainer>
            <div id="content-main">
                <router-view/>
            </div>
        </ElContainer>
    </ElContainer>
</template>

<style scoped>
#content-main {
    flex-grow: 1;
    margin: 10px;
}
.el-menu {
    height: 100vh;
}
</style>