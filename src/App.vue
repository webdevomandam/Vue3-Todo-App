<template>
    <Suspense>
        <template #default>
            <div>
                <h1 style="text-align: center">TODOS</h1>
                <router-view></router-view>
            </div>
            
        </template>
        <template #fallback>
            <span>Loading...</span>
        </template>
    </Suspense>
</template>
