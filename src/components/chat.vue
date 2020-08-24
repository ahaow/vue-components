<template>
  <div class="chat">
    <div class="chat-input">
      <el-input v-model="msg" placeholder="请输入内容" class="input"></el-input>
      <div class="icon-box" v-clickOutSide="handleHide">
        <div class="emoji-warpper" v-show="show">
          <el-scrollbar style="height:100%">
            <ul class="emoji-list">
              <li
                class="emoji-item"
                v-for="item in emoji"
                :key="item"
                @click="handleSelectEmoji(item)"
              >
                <img
                  :src="require(`@/assets/emoji/${getRegName(item)}.png`)"
                  width="22px"
                  height="22px"
                  alt
                />
              </li>
            </ul>
          </el-scrollbar>
        </div>
        <i class="iconfont iconemoji icon" @click="handleShow"></i>
      </div>
      <el-button type="primary" size="mini" class="send" @click="handleSend">发送</el-button>
    </div>
    <ul class="chat-list">
      <li class="chat-item" v-for="item in msgList" :key="item" v-html="emojiHtml(item)"></li>
    </ul>
  </div>
</template>

<script>
import emoji_utils from "@/utils/emoji.js";
import HtmlEncode from "@/utils/HtmlEncode.js";
export default {
  name: "chat",
  data() {
    return {
      show: false,
      msg: "",
      emoji: [],
      msgList: [],
      emojiData: {},
    };
  },
  methods: {
    handleShow() {
      this.show = true;
    },
    handleHide() {
      this.show = false;
    },
    getRegName(name) {
      return name.replace(/[{emoji:}]/g, "");
    },
    handleSelectEmoji(item) {
      this.msg += item;
    },
    handleSend() {
      this.msgList = [...this.msgList, this.msg];
      this.msg = "";
    },
    emojiHtml(val) {
      if (!val) return;
      emoji_utils.forEach((item) => {
        let key = Object.keys(item);
        val = val.replace(new RegExp(key, "g"), this.createIcon(key));
      });
      // 限制除了img标签
      let reg = /(?!<img data-name="ys" .+?>)<.+?>/;
      val = val.replace(new RegExp(reg, "g"), (tag) => {
        return HtmlEncode(tag);
      });
      return val;
    },
    createIcon(item) {
      console.log("item", item); // {emoji:55}
      const value = this.emojiData[item];
      const img = require(`@/assets/emoji/${value}`);
      return `<img data-name="ys" src="${img}" width="22px" height="22px"/>`;
    },
  },
  created() {
    emoji_utils.forEach((item) => {
      this.emoji.push(...Object.keys(item));
    });

    Object.values(emoji_utils).forEach((item) => {
      this.emojiData = { ...this.emojiData, ...item };
    });
  },
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.chat {
  width: 500px;
  margin: 200px auto 0;
  .chat-input {
    display: flex;
    flex-direction: row;
    align-items: center;
    .input {
      flex: 0 0 80%;
      width: 80%;
    }
    .icon-box {
      position: relative;
      .icon {
        font-size: 25px;
        color: #dcdfe6;
        margin-left: 10px;
        cursor: pointer;
      }
      .emoji-warpper {
        position: absolute;
        bottom: 35px;
        left: -90px;
        width: 240px;
        height: 130px;
        border: 1px solid #ddd;
        background-color: #fff;
        & /deep/ .el-scrollbar__wrap {
          overflow-y: scroll;
          overflow: auto;
        }
        .emoji-list {
          display: flex;
          flex-wrap: wrap;
          .emoji-item {
            padding: 2px;
            cursor: pointer;
          }
        }
      }
    }
    .send {
      margin-left: 10px;
      flex: 1;
    }
  }
  .chat-list {
    margin-top: 10px;
    .chat-item {
    }
  }
}
</style>