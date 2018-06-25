<template>
<div>
  <el-card class="box-card word-card" shadow="hover" v-loading="loading">
  <div slot="header" class="clearfix">
    <span>{{key}}</span>
  </div>
     <div v-for="(answer, index) in intro" :key="answer.id">
        <el-button class="select-item" :type="type[index]" :disabled="disabled.after" @click="selectAnswer(answer.id, index)" plain>{{answer.value}}</el-button>
    </div>
  </el-card>
  <el-button type="danger" plain :disabled="disabled.pass" @click="nextWord()">跳过</el-button> 
  <el-button type="primary" plain :disabled="disabled.next" @click="nextWord()">下一个</el-button>
  <el-button v-if="this.$props.mode !== 'exam'" icon="el-icon-edit" plain :disabled="disabled.addNote" @click="addToNote">笔记</el-button>
</div>
</template>

<script>
export default {
  props: {
    mode: String
  },
  data() {
    return {
      loading: true,
      key: "",
      value: "",
      intro: [],
      id: 0,
      type: new Array(4).fill(""),
      disabled: this.initDisabled(),
      isCorrect: false,
      reviewIndex: 0,
      exam: {
        data: [],
        index: 0,
        true: 0,
      }
    };
  },
  mounted() {
    if (this.$props.mode == "study") this.getTheWord();
    else if (this.$props.mode == "review") this.getReviewWord();
    else if (this.$props.mode == "exam") this.getExamWord();
  },
  methods: {
    addToNote() {
      if (this.$props.mode !== "exam")
      {
        this.disabled.addNote = true;
        this.$message({
          message: "已成功加入你的笔记",
          type: "success"
        });
      }
      this.$http
        .post("/api/addnote", {
          wordIds: [this.id],
          user: this.$route.query.user
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    initDisabled() {
      return {
        after: false,
        pass: false,
        next: true,
        isCorrect: false,
        addNote: false
      };
    },
    setDisabled(isCorrect) {
      this.disabled = {
        after: true,
        pass: true,
        next: false,
        isCorrect: isCorrect,
        addNote: false
      };
    },
    receiveData(data) {
      console.log(data)
      this.key = data.word.key;
      this.id = data.word._id;
      this.value = data.word.value;
      this.intro = [
        ...data.falseValue,
        { value: this.value, id: this.id }
      ].sort(() => 0.5 - Math.random());
      this.loading = false
    },
    getReviewWord() {
      this.reviewIndex++;
      this.loading = true
      this.$http
        .get("/api/reviewword", {
          params: {...this.$route.query, index:this.reviewIndex}
        })
        .then(response => {
          console.log(response);
          if (response.data.word === -1) {
            this.$message({
              message: "您还没有背过单词",
              type: "warning"
            });
            this.loading = false
          }
          else {
            this.receiveData(response.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTheWord() {
      this.loading = true
      this.$http
        .get("/api/word", {
          params: this.$route.query
        })
        .then(response => {
          console.log(response);
          this.receiveData(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getExamWord() {
      this.loading = true
      this.$http
        .get("/api/exam", {
          params: this.$route.query
        })
        .then(response => {
          console.log(response);
          this.exam.data = response.data
          this.setExamWord(this.exam.index++)
        })
        .catch(error => {
          console.log(error);
        });
    },
    setExamWord(index) {
      const data = this.exam.data
      this.receiveData({
        word: data.records[index].word,
        falseValue: data.falseValue.slice(index, index + 3)
      })
    },
    selectAnswer(id, index) {
      if (id === this.id) {
        this.type[index] = "primary";
        this.setDisabled(true);
        this.isCorrect = true;
      } else {
        this.setDisabled(false);
        this.type[index] = "danger";
        this.isCorrect = false;
        let objIndex = 0;
        for (const item of this.intro) {
          if (this.id == item.id) {
            this.type[objIndex] = "primary";
            break;
          }
          objIndex++;
        }
      }
    },
    nextWord() {
      this.type.fill("");
      this.disabled = this.initDisabled();
      if (this.$props.mode === "exam") {
        this.exam.true += this.isCorrect ? 1 : 0
        if (this.isCorrect === false)
          this.addToNote()
        if (this.exam.index === 10) {
          this.$message({
            message: "考试已结束",
            type: "success"
          });
          this.$router.push({
            path: 'examresult',
            query: {true: this.exam.true}
          })
        }
        else {
          this.setExamWord(this.exam.index++)
        }
      }
      else if (this.$props.mode === "review") {
        this.getReviewWord()
        this.postStudyResult()
      }
      else {
        this.getTheWord()
        this.postStudyResult()
      }
    },
    postStudyResult() {
      this.$http
        .post("/api/wordresult", {
          user: this.$route.query.user,
          wordID: this.id,
          isCorrect: this.isCorrect
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
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