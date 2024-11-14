<template>
    <div id="content-view">
        <Editor id="editor" v-model="content" :init="init" />
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

const content = ref('')

const init = {
  selector: '#editor',
  language:'zh_CN',
  height: '100%',
  promotion:false,
  branding: false,
  plugins: ['code', 'table', 'bmos'], //引入工具插件
  toolbar: ['code table bmos'], //工具栏显示
  menubar: false,
  line_height_formats: '1 1.2 1.4 1.6 2', //行高
  font_size_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', //字体大小
  font_family_formats:'微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
  content_css:'../../../../../src/assets/tinymce.css'
}
tinymce.PluginManager.add('bmos', (editor, url) => {

    editor.ui.registry.addButton('bmos', {
        text: 'bmos',
        onAction: function () {
            editor.insertContent('<input type="text" name="test" value="bmos"><br/>')
        }
    });
    
    return {
        getMetadata: function () {
        return  {
            //插件名和链接会显示在“帮助”→“插件”→“已安装的插件”中
            name: "bmos",//插件名称
            url: "http://exampleplugindocsurl.com", //作者网址
        };
        }
    };
});

tinymce.init({})

</script>
<style scoped>

</style>