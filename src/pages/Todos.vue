<template>
    <div style="display:grid; justify-content: center">
        <base-table
            :headers="headers"
            :items="ucFirstTodos"
            page-size="10"
        />
    </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { capitalize } from '@/utils'
import BaseTable from '@/components/BaseTable.vue'
export default {
    name: 'todos',
    components: {
        BaseTable
    },
    async setup() {
        const json = await fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => json)
        const todos = reactive(json)
        
        const ucFirstTodos = computed(() => todos.map(todo => ({ ...todo, title: capitalize(todo.title)})))
        const headers = computed(() => Object.keys(todos[0]).filter((key) => key !== 'userId'))

        return {
            todos,
            ucFirstTodos,
            headers
        }
    },
}

</script>

<style>
</style>