<template>
  <div class="edit-content" style="padding: 0 20px">
    <h3 style="margin: 0;">Edit Content</h3>
    <div style="margin: 12px 0;">
      <el-button @click="formatCode" size="mini">格式化</el-button>
      <el-button @click="componseCode" size="mini">压缩</el-button>
      <el-button @click="save()" size="mini">保存</el-button>
    </div>
    <div style="display:flex;">
    <textarea ref="codeEdit" class="code" :style="{height: tableHeight+ 'px'}"></textarea>
      <div style="min-width: 320px; max-width: 360px; overflow-x:hidden;padding:10px;line-height:1.5em;" :style="{height: tableHeight+ 'px'}" class="content">
        <p v-html="code"></p>
      </div>
    </div>
  </div>
</template>

<script>
import "codemirror/theme/ambiance.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";

import CodeMirror from 'codemirror/lib/codemirror'
require("codemirror/addon/edit/matchbrackets");
require("codemirror/addon/selection/active-line");
require("codemirror/addon/hint/show-hint");
import '../../utils/formatting'
import ArtApi from '@/api/article';
import { style_html } from './format'

export default {
  name: 'EditContent',
  data() {
    return {
      id: '',
      code: '',
      editor: null,
      tableHeight: 200
    }
  },
  mounted() {
    this.tableHeight = window.innerHeight - 200
    this.id = this.$route.params.id
    this.loadArticle()
    let editor = CodeMirror.fromTextArea(this.$refs.codeEdit, {
      mode: 'text/html',
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets: true,
      lineWrapping: true,
    })
    this.editor = editor
    editor.setSize('auto', this.tableHeight+'px')
    editor.on('change', this.change)
  },
  methods: {
    change(editor, obj) {
      this.code = editor.getValue()
    },
    loadArticle() {
      ArtApi.getArticleById(this.id).then(data => {
        this.code = data.transcoding
        this.editor.setValue(data.transcoding)
      })
    },
    save() {
      this.componseCode()
      ArtApi.editContent(this.id, {'trans_text': this.code}).then(data => {
        this.$message({message:'编辑成功',type:'success'})
        this.$router.push({path:'/art/'+this.id})
      })      
    },
    getSelectedRange() {
      return { from: this.editor.getCursor(true), to: this.editor.getCursor(false) };
    },
    formatCode() {
      var data = this.editor.getValue()
      var f = style_html(data, 4, ' ')
      this.editor.setValue(f)
      this.code = f
    },
    componseCode() {
      var rep = /\n+/g;
      var repone = /<!--.*?-->/ig;
      var reptwo = /\/\*.*?\*\//ig;
      var reptree = /[ ]+</ig;
      var data = this.editor.getValue()
      var sourceZero = data.replace(rep,"");
      var sourceOne = sourceZero.replace(repone,"");
      var sourceTwo = sourceOne.replace(reptwo,"");
      var sourceTree = sourceTwo.replace(reptree,"<"); 
      this.editor.setValue(sourceTree)
      this.code = sourceTree
    }
  }
}
</script>
<style>
.el-container {
  flex-basis: 0;
}
.edit-content {
  text-align: left;
}
.edit-content .CodeMirror {
  max-height: 100%;
}
.edit-content .content img{
  max-width: 100% !important;
}
</style>
