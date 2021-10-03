<template>
  <transition name="modal">
    <div class="modal">
      <div class="modalContainer">
        <div class="modalTextContainer">
          <div class="modalText">
            <p class="modalBalance">あなたの残高{{ val }}</p>
            <span>送る金額</span><br />
            <input type="text" v-model="$store.state.transfer" />
          </div>
        </div>
        <div class="modalBtnContainer">
          <button class="modalBtn modalSendBtn" @click="$emit('send')">
            送る
          </button>
          <button class="modalBtn" @click="$emit('close')">閉じる</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal2',
  props: {
    val: {
      type: Number,
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 30;
  background: rgba(0, 0, 0, 0.5);
}
.modalContainer {
  background: #fafafa;
  width: 300px;
  height: 180px;
  border-radius: 4px;
  position: relative;
}
.modalTextContainer {
  position: absolute;
  width: 100%;
  height: 60%;
}
.modalText {
  margin-top: 1em;
  margin-left: 1em;
}
.modalBtnContainer {
  display: flex;
  justify-content: space-evenly;
  position: relative;
  top: 108px;
  width: 100%;
  height: 40%;
  border-radius: 0 0 4px 4px;
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  background: #8888;
}
.modalBtn {
  position: relative;
  top: 25%;
  height: 30px;
  width: 80px;
  background-color: #e74c3c;
}
.modalBtn:hover {
  background-color: #ff5341;
}
.modalSendBtn {
  background-color: #1da1f3;
}
.modalSendBtn:hover {
  background-color: #5fb1f1;
}
</style>
