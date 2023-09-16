<template>
    <div class="fullscreen  text-white text-center q-pa-md flex flex-center">
        <div class="admin-hbody">
            <h1>Admin Jobs</h1>
            <section class="admin_jobs">

                <ul class="flex ">
                    <li>

                        <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/adm-customer-list"
                            label="Customers" no-caps />
                    </li>
                    <li>
                        <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/adm-enquiry-list"
                            label="Enquiry" no-caps />
                    </li>
                    <li>

                        <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/adm-business-list"
                            label="Businesses" no-caps />
                    </li>
                    <li>
                        <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/adm-cat-list"
                            label="Categories" no-caps />
                    </li>
                    <li>
                        <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/adm-performance-dashboard"
                            label="Performance" no-caps />
                    </li>
                </ul>
            </section>

        </div>
    </div>
</template>
  
<script setup lang="ts">

</script>
<style scoped lang="scss">
ul {
    list-style: none;
    margin: 0;
    padding: 0;
    justify-content: space-between;
}
.admin_jobs{
    margin: 0 auto;
    
    width: 960px;

}

</style>
  