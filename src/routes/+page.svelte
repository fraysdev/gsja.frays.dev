<div id="app">
    <h1>Welcome to <code>gsja.frays.dev</code>!</h1>
    <p>This subdomain used for project related to GSJA only!</p>

    <div id="info">
        This web use 
        <a href="https://svelte.dev/">
            <img class="svelte-icon" src="/svelte.png" alt="Svelte">
            <span class="svelte">Svelte</span>
        </a>
        as Web Framework!
    </div>
</div>

<!-- -+---+- Styles -+---+- -->
<style>
    :global(body) {
        margin: 0;
    }

    #app {
        height: 100vh;
        background-color: antiquewhite;

        font-family: "Lexend", sans-serif;
        font-optical-sizing: auto;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #info {
        position: absolute;
        right: 1vh;
        bottom: 1vh;
    }

    .svelte-icon {
        height: 1em;
    }

    .svelte {
        color: #ff3e00;
    }

    code {
        font-family: "IBM Plex Mono", monospace;
        font-style: normal;
    }

    h1, p {
        margin: 0 0;
    }

    a {
        text-decoration: none;
    }

</style>
