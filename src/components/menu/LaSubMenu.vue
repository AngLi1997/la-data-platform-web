<script setup lang="ts">
    import type {LaMenuType} from "./LaMenuType";
    import { RouterLink } from "vue-router";
    const props = defineProps({
        menus: {
            type: Array as () => LaMenuType[],
            default: () => []
        }
    })
</script>
<template>
    <template v-for="menu in menus" :key="menu.id">
        <el-sub-menu v-if="menu.children?.length !== 0" :index="menu.id">
            <template #title>
                <i :class="menu.icon"></i>
                <span>{{menu.label}}</span>
            </template>
            <la-sub-menu v-if="menu.children?.length !== 0" :menus="menu.children"/>
        </el-sub-menu>
        <router-link v-else :to="menu.path || ''">
            <el-menu-item :index="menu.id">
                <i :class="menu.icon"></i>
                <template #title>{{menu.label}}</template>
            </el-menu-item>
        </router-link>
    </template>
</template>
<style scoped>

</style>