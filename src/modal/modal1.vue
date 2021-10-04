<template>
  <transition name="modal">
    <div class="modal">
      <div class="modalContainer">
        <div class="modalTextContainer">
          <p>{{ name }}さんの残高</p>
          <p>{{ MyWallet }}</p>
        </div>
        <div class="modalBtnContainer">
          <button class="modalBtn" @click="$emit('close')">Close</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    name: {
      type: String,
    },
    MyWallet: {
      type: String,
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
  width: 200px;
  height: 180px;
  border-radius: 4px;
  position: relative;
}
.modalTextContainer {
  position: absolute;
  width: 100%;
  height: 60%;
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
</style>
