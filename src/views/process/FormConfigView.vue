<template>
    <div id="content-view">
        <div id="content-view-top" style="justify-content: left;">
            <ElButton @click="getHtml">外部获取xml</ElButton>
            <ElButton @click="addComponent(tinymce.get('editor'))">外部添加组件</ElButton>
        </div>
        <div id="content-view-main">
            <Editor id="editor" v-model="content" :init="init" />
        </div>
    </div>
</template>
<script setup>
import Editor from '@tinymce/tinymce-vue';
import tinymce from 'tinymce/tinymce';
import { ref } from 'vue';
import 'tinymce/models/dom';
import 'tinymce/skins/ui/oxide/skin.css'
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/langs/zh_CN';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/image';
import axios from 'axios';
import { ElMessageBox } from 'element-plus';

const content = ref('')

const init = {
  selector: '#editor',
  language:'zh_CN',
  height: '100%',
  width: '100%',
  promotion:false,
  branding: false,
  doctype: '<!DOCTYPE html>',
  schema: 'html5',
  plugins: ['code', 'table', 'addComponent', 'wordToHtml', 'preview'], //引入工具插件
  toolbar: ['preview code table addComponent wordToHtml'], //工具栏显示
  menubar: true,
  object_resizing: true,
  images_upload_handler: function(blobInfo, success, failure) {
    // 图片blob转base64
    return Promise.resolve("data:" + blobInfo.blob().type + ";base64," + blobInfo.base64());
},
  line_height_formats: '1 1.2 1.4 1.6 2', //行高
  font_size_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', //字体大小
  font_family_formats:'微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
  content_css:'../../../../../src/assets/tinymce.css'
}

tinymce.PluginManager.add('addComponent', (editor, url) => {

    editor.ui.registry.addButton('addComponent', {
        text: '添加业务组件',
        onAction: function () {
            addComponent(editor)
        }
    });
    
    return {
        getMetadata: function () {
        return  {
            name: "bmos",
            url: "http://liang.com"
        };
        }
    };
});

tinymce.PluginManager.add('wordToHtml', (editor, url) => {

    editor.ui.registry.addButton('wordToHtml', {
        text: '导入word',
        onAction: function () {
            importWord(editor)
        }
    });

    return {
        getMetadata: function () {
        return  {
            name: "bmos",
            url: "http://liang.com"
        };
        }
    };
});

tinymce.init({
    license_key: 'gpl'
})

const getHtml = () => {
    let info = tinymce.get('editor').getContent();
    ElMessageBox.alert(info, 'html内容')
}

const addComponent = (editor) => {
    let now = new Date()
    let time = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
    editor.insertContent('<input type="text" value="' + time +'" />')
}

const importWord = (editor) => {
    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.doc, .docx');
    input.click();
    input.onchange = function() {
        var file = this.files[0];
        let formData = new FormData();
        formData.append('file', file)
        axios.post('/api/process/form/convertToHtml', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
            console.log(res.data)
            editor.insertContent(res.data.data)
        })
        .finally(() => {
            input.remove();  
        })
    }
}

</script>

<style scoped>

</style>