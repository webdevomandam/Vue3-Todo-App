<template>
  <table>
      <thead>
          <tr style="text-align: left">
            <th v-for="header in headers" :key="header"> {{header.toUpperCase()}}</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="item in paginatedItems" :key="item">
                <td>{{item.id}}</td>
                <td @click="goto(item)">{{item.title}}</td>
                <td style="text-align:center">
                    <svg v-if="item.completed" @click="markAs(item.id, !item.completed)" style="width: 20px; color:green" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <svg v-else @click="markAs(item.id, !item.completed)" style="width: 20px; color:red" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </td>
          </tr>
      </tbody>
      
  </table>
  <div style="display: flex; justify-content:flex-end; margin-top: 10px">
        <label for="page-size">Display:</label>
        <select v-model="pageSize" id="page-size" style="margin-right: 5px">
            <option v-for="size in pageSizes" :value="size" :key="size">{{size}}</option>
        </select>
        <button 
            @click="currentPage--" 
            :disabled="currentPage === 1"
        >
            Prev
        </button>
        <input 
            type="number" 
            id="page" 
            name="page" 
            min="1" 
            :max="lastPage" 
            v-model="currentPage" 
            style="width: 50px"
        >
        <button 
            @click="currentPage++" 
            :disabled="currentPage === lastPage"
        >
            Next
        </button>
  </div>
</template>

<script>
import { computed, ref, watch} from 'vue'
export default {
    props: {
        headers: Array,
        items: Array,
        pageSize: String | Number
    },
    setup(props) {
        const items = ref(props.items)
        const currentPage = ref(1)
        const pageSize = ref(props.pageSize)
        const lastPage = computed(() => items.value.length / pageSize.value)
        watch(pageSize, () => {
            currentPage.value = 1
        })
        watch(currentPage, (val) => {
            if(val < 1)
                currentPage.value = 1

            if(val > lastPage.value)
                currentPage.value = lastPage.value
        })
        const paginatedItems = computed(() => {
            const start = currentPage.value === 1 ? 0 : (currentPage.value * pageSize.value) - pageSize.value
            const end = currentPage.value === 1 ? pageSize.value : (currentPage.value * pageSize.value)
            return props.items.slice(start, end)
        })
        
        const pageSizes = [10, 50, 100]
        const markAs = (id, isComplete) => {
            const params = {
                method: 'PATCH',
                body: JSON.stringify({ completed: isComplete }),
                headers: {'Content-type': 'application/json; charset=UTF-8'}
            }
            
            fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, params)
                .then(() => {
                    items.value = items.value.map(item => {
                        if(item.id === id)
                            item.completed = isComplete
                        return item
                    })
                    
                })
        }

        const goto = (item) => this.$router.push({name: 'todo', params: {id: item.id}})
       
        return {
            paginatedItems,
            markAs,
            lastPage,
            currentPage,
            pageSizes,
            pageSize,
            goto
        }
    }
}
</script>

<style>

</style>