<template>
  <div class="row">
    <div v-if="task" class="col s7 offset-s2">
      <h1>{{ task.title }}</h1>

      <form @submit.prevent="submiteHandler">
        <!-- <div class="chips" ref="chips"></div> -->

        <div class="input-field">
          <textarea
            style="min-height: 100px;"
            v-model="description"
            id="description"
            class="materialize-textarea"
          ></textarea>
          <label for="description">Текст</label>
          <span class="character-counter" style="float: right; font-size: 12px">
            {{ description.length }}/2048
          </span>
        </div>

        <input type="text" ref="datepicker" />

        <div v-if="task.status !== 'Завершена'" class="btnContainer">
          <button class="btn orange" type="submit">
            Завершить редактирование
          </button>
          <button class="btn indigo" type="submit" @click="completeTask">
            Завершить задачу
          </button>
        </div>
        <div v-else class="btnContainer">
          <button class="btn orange" type="submit">
            Завершить редактирование
          </button>
          <button class="btn red" type="button" @click="deleteTask">
            Удалить задачу
          </button>
        </div>
      </form>
    </div>
    <p v-else>Задача не найдена</p>
  </div>
</template>

<script>
export default {
  name: "Task",
  computed: {
    task() {
      return this.$store.getters.taskById(+this.$route.params.id);
    },
  },
  data() {
    return {
      description: "",
      // chips: null,
      data: null,
    };
  },
  mounted() {
    this.description = this.task.description;
    // this.chips = M.Chips.init(this.$refs.chips, {
    //   placeholder: "Хэштеги",
    //   data: this.task.tags,
    // });
    this.data = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(this.task.data),
      setDefaultDate: true,
    });
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    submiteHandler() {
      this.$store.dispatch("updateTask", {
        id: this.task.id,
        description: this.description,
        data: this.data.date,
      });
      this.$router.push("/list");
    },
    completeTask() {
      this.$store.dispatch("completeTask", this.task.id);
      this.$router.push("/list");
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.task.id);
      this.$router.push("/list");
    },
  },
  unmounted() {
    // if (this.chips && this.chips.destroy) {
    //   this.chips.destroy();
    // }

    if (this.data && this.data.destroy) {
      this.data.destroy();
    }
  },
};
</script>

<style lang="scss" scoped>
.btnContainer {
  display: flex;
  justify-content: space-between;
}
</style>