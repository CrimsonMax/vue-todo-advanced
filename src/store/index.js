import { Date } from 'core-js'
import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(elem => {
      if (new Date(elem.data) < new Date()) {
        elem.status = 'Просрочена'
      }
      return elem
    })
  },
  mutations: {
    createTask(state, task) {
      if (new Date(task.data) < new Date()) {
        task.status = 'Просрочена'
      }
      state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, { id, description, data }) {
      const tasks = state.tasks.concat()
      const idx = tasks.findIndex(elem => elem.id === id)
      const task = tasks[idx]
      const status = new Date(data) > new Date() ? 'Активна' : 'Просрочена'
      tasks[idx] = { ...task, data, description, status }
      state.tasks = tasks
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    completeTask(state, id) {
      const idx = state.tasks.findIndex(elem => elem.id === id)
      state.tasks[idx].status = 'Завершена'
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    deleteTask(state, id) {
      if (confirm("Вы действительно хотите удалить задачу?")) {
        state.tasks = state.tasks.filter((elem) => elem.id !== id);
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  actions: {
    createTask({ commit }, task) {
      commit('createTask', task)
    },
    updateTask({ commit }, task) {
      commit('updateTask', task)
    },
    completeTask({ commit }, id) {
      commit('completeTask', id)
    },
    deleteTask({ commit }, id) {
      commit('deleteTask', id)
    }
  },
  getters: {
    tasks: elem => elem.tasks,
    taskById: elem => id => elem.tasks.find(elem => elem.id === id)
  },
  modules: {
  }
})
