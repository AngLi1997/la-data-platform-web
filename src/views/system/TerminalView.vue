<template>
    <div>
        <div id="terminal" ref="terminalRef" class="xterm"></div>
    </div>
</template>
<script setup lang="ts">
import { da } from "element-plus/es/locales.mjs";
import { onMounted, reactive, ref } from "vue";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

const term = ref();
const terminalRef = ref(null);
const fitAddon = new FitAddon();

const initTerminal = () => {
    term.value = new Terminal({
      fontSize: 14,
      fontFamily: "Monaco, Menlo, Consolas, 'Courier New', monospace",
      theme: {
        background: '#181d28',
      },
      cursorBlink: true,
      cursorStyle: 'underline',
    })
    term.value.open(terminalRef.value) //挂载dom窗口
    term.value.loadAddon(fitAddon) //自适应尺寸
    term.value.onData((data: any) => {
        console.log(data);
        term.value.write(data)
    })
    // 不能初始化的时候fit,需要等terminal准备就绪,可以设置延时操作
    setTimeout(() => {
      fitAddon.fit()
    }, 5)
}

onMounted(() => {
    initTerminal();  
})

</script>
<style>
</style>