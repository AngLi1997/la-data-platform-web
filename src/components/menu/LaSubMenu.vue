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
        <ElSubMenu v-if="menu.children?.length !== 0" :index="menu.id">
            <template #title>
                <ElIcon>
                    <component :is="menu.icon" />
                </ElIcon>
                <span>{{menu.label}}</span>
            </template>
            <la-sub-menu v-if="menu.children?.length !== 0" :menus="menu.children"/>
        </ElSubMenu>
        <RouterLink v-else :to="menu.path || ''">
            <ElMenuItem :index="menu.id">
                <ElIcon>
                    <component :is="menu.icon" />
                </ElIcon>
                <template #title>{{menu.label}}</template>
            </ElMenuItem>
        </RouterLink>
    </template>
</template>
<style scoped>

</style>