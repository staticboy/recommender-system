<template>
    <div class="fullscreen  text-white text-center q-pa-md ">
        <div>
            <h1>Admin Jobs</h1>
            <section class="admin_jobs">

                <ul>
                    <li>
                        <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/adm-business-list" label="Businesses" no-caps />
                    </li>
                    <li>
                        <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/adm-cat-list" label="Categories" no-caps />
                    </li>
                    <li>
                        <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/adm-performance-dashboard" label="Performance" no-caps />
                    </li>
                </ul>
            </section>

            <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/adm-home" label="Go Home" no-caps />
        </div>
    </div>
</template>
  
<script setup lang="ts">

</script>
<style scoped lang="scss">
ul{list-style: none;}
</style>
  