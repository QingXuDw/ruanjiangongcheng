<template>
  <el-popover placement="top" width="600" trigger="hover" v-model="visible">
    <div style="text-align: right; margin: 0">
      <div style="overflow:hidden" v-html="content">
      </div>
    </div>
    <el-button slot="reference">查看详情</el-button>
  </el-popover>
</template>
<script>
export default {
  data() {
    return {
        visible: false,
        test: '<h2>这是富文本测试内容</h2><p><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAfCAYAAAD5h919AAACC0lEQVRIDe2VrzNEURTH949RFIpCUQiKDQQ2EFCUFbYsYcuOoGCGwAYCgoKgGEHBDAFhi3/mms+d+d45775fu3ZsEnbOe++ecz7nfO89dysjo2NuGL/KMCAwSkFT0zOu3mi6ztmFu71/cF/db//jmW+s4VNWcC6I4IOjk5BYgDyLbxEwE1RbXXcvbx89QwQnhtis7lKgjc163wCBZMkRwxIgqpHzoDbuLIDQ18q1u7fvq6K6x6dnX8Dr+6e7ur7xP54phjV1QIwKJJfdswA6PD4NTjjvtNqJ9scnJhPvSMM3+726uJzIQU5J6EGQVYlsDFJAkc3aX3XlQVuNZgoUa1wE0FrWHpObdQ/qnF8mQOyDgvu1xEoVLLkD6M5MPIu/kU0FxepwgwSQrWBQUHwgyPcnINSwhTMGAaQ5kYN0lRz92HhMtN+Zh4Fhs/PRK4gYO/QUrlnKPd7cxr0C5Bd3AyhxvO3AcgIlJSeGzVWiPItPfKyBsD9SxndEAlXDnxmLNhA5VJmFcRPEUmmfsXZMAoiudFFyOQKz8zU7N5/qzCphAXE3FBdAvNi7SomRRe3bbvQcA/QeX2EJkIUhyXar7aoLS662spbqpgikvw35YFMgwSSjKrRB9lnrWGKyILkgFtBfB4QkNrl9FoCNL5I4syObCGCst11nrQgg31KQHAe1/6DcQ1Em7dCk+wFp4ZSvOD3ZJwAAAABJRU5ErkJggg==\"></p>'
    };
  },
  props: {
    content: "",
  },
  computed: {
  },
  methods: {},
};
</script>

<style scoped>
</style>
