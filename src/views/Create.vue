<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Создать задачу</h1>

      <form @submit.prevent="submiteHandler">
        <div class="input-field">
          <input
            id="title"
            v-model="title"
            type="text"
            class="validate"
            required
          />
          <label for="title">Заголовок</label>
          <span class="helper-text" data-error="Заголовок обязателен!"></span>
        </div>

        <!-- <div class="chips" ref="chips"></div> -->

        <div class="input-field">
          <textarea
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

        <button class="btn red" type="submit">Создать</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Create",
  components: {},
  data() {
    return {
      description: "",
      title: "",
      // chips: null,
      data: null,
    };
  },
  mounted() {
    // this.chips = M.Chips.init(this.$refs.chips, {
    //   placeholder: "Хэштеги",
    // });
    this.data = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(),
      setDefaultDate: true,
    });
  },
  methods: {
    submiteHandler() {
      const task = {
        title: this.title,
        description: this.description,
        id: Math.floor(Math.random() * 100000),
        status: "Активна",
        // tags: this.chips.chipsData,
        data: this.data.date,
      };

      this.$store.dispatch("createTask", task);
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
