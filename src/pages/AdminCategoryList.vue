<script setup lang="ts"></script>
<template>
    <div class="fullscreen text-white text-center q-pa-md flex flex-center">
        <div>
            <header>
                <h1>
                    Admin Category List
                </h1>

                <div class="btngrp">
                    <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/adm-home" label="Go Home" no-caps />

                </div>
            </header>

            <table>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th></th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Shirt</td>
                    <td><button>View Category Profile</button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Shoes</td>
                    <td><button>View Category Profile</button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Shorts</td>
                    <td><button>View Category Profile</button></td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Jacket</td>
                    <td><button>View Category Profile</button></td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Sunglasses</td>
                    <td><button>View Category Profile</button></td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>Caps</td>
                    <td><button>View Category Profile</button></td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>Helmet</td>
                    <td><button>View Category Profile</button></td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>Accessories</td>
                    <td><button>View Category Profile</button></td>
                </tr>
                
            </table>





        </div>
    </div>
</template>
<style scoped lang="scss">
* {
    text-align: left;
}

table * {
    padding: 8px;
}
</style>
