<template>
  <div>
    <el-card style="width: 75%">
      <el-row :gutter="24">
        <!-- 模糊搜索 -->
        <el-col :span="16" :offset="4">
          <el-input
            clearable
            @clear="getMessageList(query)"
            placeholder="请输入内容"
            v-model="query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getMessageList(query)"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-collapse v-model="activeNames">
        <el-collapse-item
          v-for="(message, index) in this.messageList" 
          :key="index"
          :title="message.title" 
          :name="index">
          <p>{{message.publishTime}}</p>
          <p>{{ message.content }}</p>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageList: [],
      query: "",
      activeNames:[],
    };
  },
  mounted(){
    this.getMessageList("");
  },
  methods: {
    async getMessageList(query) {
      this.query = query;
      let response = await this.$axios.post(this.$api.getMessage, {
        page_num: 0,
        page_size: 100,
        title: this.query,
      });
      this.messageList = response.data;
      this.messageList.forEach((object, index, list)=>{
        list[index].showDetail = false;
      })
    },
    switchShowDetail(index){
      this.messageList[index].showDetail = !this.messageList[index].showDetail;
    }
  },
};
</script>

<style scoped>


</style>