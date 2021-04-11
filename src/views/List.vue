<template>
  <div>
    <h1>Список задач</h1>

    <div v-if="tasks.length" class="row">
      <div class="input-field s12 col">
        <select ref="select" v-model="filter">
          <option value="" disabled selected>Фильтровать задачи</option>
          <option value="Активна">Активные</option>
          <option value="Просрочена">Просроченые</option>
          <option value="Завершена">Завершённые</option>
        </select>
      </div>
    </div>

    <button v-if="filter" class="btn btn-small blue" @click="filter = null">Очистить фильтр</button>

    <hr />

    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Заголовок</th>
          <th>Дата</th>
          <th>Описание</th>
          <th>Статус</th>
          <th>Открыть</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, idx) of displayTasks" :key="task.id">
          <td>{{ idx + 1 }}</td>
          <td>{{ task.title }}</td>
          <td>{{ new Date(task.data).toLocaleDateString() }}</td>
          <td class="cutHelper">
            <div class="cutText">{{ task.description }}</div>
          </td>
          <td>{{ task.status }}</td>
          <td>
            <router-link
              tag="button"
              class="btn btn-small"
              :to="'/task/' + task.id"
            >
              Редактировать
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Задач нет</p>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      filter: null,
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    displayTasks() {
      return this.tasks.filter((elem) =>
        !this.filter ? true : elem.status === this.filter
      );
    },
  },
  mounted() {
    M.FormSelect.init(this.$refs.select);
  },
};
</script>

<style lang="scss" scoped>
.cutHelper {
  max-width: 400px;
}
.cutText {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>