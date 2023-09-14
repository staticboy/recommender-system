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
                    <td><router-link to="/adm-cat-profile" class="btn">Open Category</router-link></td>

                </tr>
                <tr>
                    <td>2</td>
                    <td>Shoes</td>
                    <td><router-link to="/adm-cat-profile" class="btn">Open Category</router-link></td>

                </tr>
                <tr>
                    <td>3</td>
                    <td>Shorts</td>
                    <td><router-link to="/adm-cat-profile" class="btn">Open Category</router-link></td>

                </tr>
                <tr>
                    <td>4</td>
                    <td>Jacket</td>
                    <td><router-link to="/adm-cat-profile" class="btn">Open Category</router-link></td>

                </tr>
                <tr>
                    <td>5</td>
                    <td>Sunglasses</td>
                    <td><router-link to="/adm-cat-profile" class="btn">Open Category</router-link></td>

                </tr>
                <tr>
                    <td>6</td>
                    <td>Caps</td>
                    <td><router-link to="/adm-cat-profile" class="btn">Open Category</router-link></td>

                </tr>
                <tr>
                    <td>7</td>
                    <td>Helmet</td>
                    <td><router-link to="/adm-cat-profile" class="btn">Open Category</router-link></td>

                </tr>
                <tr>
                    <td>8</td>
                    <td>Accessories</td>
                    <td><router-link to="/adm-cat-profile" class="btn">Open Category</router-link></td>

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

.btn, button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
.btn:hover, button:hover {
  border-color: #646cff;
}
.btn:focus,
.btn:focus-visible,
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
