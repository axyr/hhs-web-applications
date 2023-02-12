<script setup>

</script>

<template>
    <header class="shadow bg-white">
        <div class="container">
            <a href="#" id="logo">
                <img src="./../../public/assets/logo.png" alt="Books Logo" height="32" />
                <span>Books</span>
            </a>
            <nav>
                <ul id="main-nav"></ul>
            </nav>
        </div>
    </header>
</template>

<style scoped>

header {
    width: 100%;
}

header .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

#logo {
    display: inline-block;
    position: relative;
    padding: 1rem 0 0.9rem 0;
    cursor: pointer;
    color: #101827;
    text-decoration: none;
    font-size: 1.5rem;
}

#logo span{
    position: relative;
    top:-0.6rem;
    margin-left: 0.5rem;
}

nav ul li {
    list-style: none;
    display: inline-block;
    margin: 0;
    padding: 0;
}

nav ul li a {
    display: inline-block;
    padding: 1.4rem;
    margin: 0;
    text-decoration: none;
    text-transform: uppercase;
    color: #101827;
    border-top: 2px solid #fff;
    border-bottom: 2px solid #fff;
}

nav ul li a.active,
nav ul li a:hover {
    background-color: #f8fafb;
    border-bottom: 2px solid #0083ff;
}

</style>