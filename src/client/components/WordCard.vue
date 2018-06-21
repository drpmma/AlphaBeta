<template>
<div>
  <el-card class="box-card word-card" shadow="hover">
  <div slot="header" class="clearfix">
    <span>{{key}}</span>
  </div>
     <div v-for="(answer, index) in intro" :key="answer.id">
        <el-button class="select-item" :type="type[index]" :disabled="disabled" @click="selectAnswer(answer.id, index)" plain>{{answer.value}}</el-button>
    </div>
  </el-card>
  <el-button type="danger" plain :disabled="passDisabled" @click="passTheWord">跳过</el-button> 
  <el-button type="primary" plain :disabled="nextDisabled" @click="nextWord">下一个</el-button>
</div>
</template>

<script>
export default {
  data() {
    return {
      key: "",
      value: "",
      intro: [
      ],
      id: 0,
      type: new Array(4).fill(""),
      disabled: false,
      passDisabled: false,
      nextDisabled: true
    };
  },
  mounted() {
    const url = "/api/word";
    this.$http
      .get(url, {
        params: this.$route.query
      })
      .then(response => {
        console.log(response);
        this.key = response.data.word.key
        this.id = response.data.word._id
        this.value = response.data.word.value
        this.intro = [...response.data.falseValue, {value: this.value, id: this.id}].sort(() => .5 - Math.random())
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    selectAnswer(id, index) {
      this.disabled = true
      this.passDisabled = true
      this.nextDisabled = false
      if (id === this.id) {
        this.type[index] = "primary"
      }
      else {
        this.type[index] = "danger"
        let objIndex = 0;
        for (const item of this.intro) {
          if (this.id == item.id) {
            this.type[objIndex] = "primary"
            break
          }
          objIndex++;
        }
      }
    },
    passTheWord() {
      
    },
    nextWord() {

    }
  }
};
</script>


<style>
.select-item {
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal !important;
  width: 100%;
  height: 6em;
}

.wrong-answer {
  type: "danger"
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.word-card {
  margin-left: 4.5em;
  margin-bottom: 1em;
}

@media screen and (max-width: 400px) {
}
@media screen and (min-width: 400px) {
  .word-card {
    width: 60%;
    margin: 0 auto;
  }
}
</style>