<template>
  <table>
      <thead>
          <tr style="text-align: left">
            <th v-for="header in headers" :key="header"> {{header.toUpperCase()}}</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="item in paginatedItems" :key="item">
                <td v-for="header in headers" :key="item[header]" v-show="header !== 'completed'">{{item[header]}}</td>
                <td style="text-align:center">
                    <svg @click="markAs(item.id, !item.completed)" v-if="item.completed" style="width: 20px; color:green" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <svg @click="markAs(item.id, !item.completed)" v-else style="width: 20px; color:red" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </td>
          </tr>
      </tbody>
      
  </table>
  <div style="display: flex; justify-content:flex-end; margin-top: 10px">
        <button>Prev</button>
        <button>Next</button>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'
export default {
    props: {
        headers: Array,
        items: Array,
        pageSize: String | Number
    },
    setup(props) {
        const {items} = toRefs(props)
        const paginatedItems = computed(() => props.items.filter((_, index) => (props.pageSize ?? 10) > index))
        const markAs = (id, completed) => {
            fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ completed }),
                headers: {'Content-type': 'application/json; charset=UTF-8'}
            })
                .then(() => {
                    items.value = items.value.map(item => {
                        if(item.id == id)
                            item.completed = completed
                        return item
                   })
                })
        }
        return {
            paginatedItems,
            markAs,
        }
    }
}
</script>

<style>

</style>