<template>
    <div>
        <div id="terminal" ref="terminalRef"></div>
    </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

const term = ref();
const terminalRef = ref(null);
const fitAddon = new FitAddon();
const cmd = ref('');

const ws = new WebSocket("ws://localhost:8080/ssh");

const initWebSocket = () => {
    ws.onopen = () => {
        ElMessage.success("连接成功");
    }
    ws.onmessage = (e) => {
        term.value.write(e.data)
    }
    ws.onclose = () => {
        ElMessage.success("连接关闭");
    }
}

const initTerminal = () => {
    term.value = new Terminal({
      fontSize: 14,
      fontFamily: "Monaco, Menlo, Consolas, 'Courier New', monospace",
      theme: {

      },
      cursorBlink: true,
      cursorStyle: 'underline',
    })
    term.value.open(terminalRef.value) //挂载dom窗口
    term.value.loadAddon(fitAddon) //自适应尺寸
    term.value.onData((data: any) => {
        term.value.write(data)
        if (data === '\r') {
            ws.send(cmd.value)
            cmd.value = '';
        } else if (data === '\x7F'){
            if(cmd.value.length > 0){
                cmd.value = cmd.value.substring(0, cmd.value.length - 1);
                term.value.write('\b \b')
            }
        // } else if (data === '\u0003'){
        //     // ctrl+c
        //     alert('ctrl+c')
        // } else if (data === '\u001b'){
        //     // esc
        //     alert('esc')
        } else {
            cmd.value += data;
        }
    })
    // 不能初始化的时候fit,需要等terminal准备就绪,可以设置延时操作
    setTimeout(() => {
      fitAddon.fit()
    }, 5)
}

onMounted(() => {
    initTerminal();  
    initWebSocket();
})

</script>
<style scoped>

</style>