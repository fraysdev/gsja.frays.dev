<script lang='ts'>
    import type { DoorprizeState } from "$lib/doorprize/doorprize";
    import { numberPadding } from "$lib/doorprize/doorprize";

    let { stateData = $bindable<DoorprizeState>() } = $props();
    const items = $derived([...stateData.history].reverse);

    function remove(n: number) {
      stateData.history = stateData.history.filter((h) => h.number !== n);
    }

    function clearAll() {
      if (confirm('Are you sure you want to delete whole history? All number can be re-roll again.'))
        stateData.history = [];
    }
</script>

<h2>
    Configuration
</h2>

<h3>Prize Number</h3>
<div>
    <div>Min range</div>
    <input type="number" bind:value={stateData.min} disabled={isRolling} />
</div>

<div>
    <div>Max range</div>
    <input type="number" bind:value={stateData.max} disabled={isRolling} />
</div>

<div>
    <div>Multi-number</div>
    <input type="number" bind:value={stateData.count} disabled={isRolling} />
</div>

<button class:danger={true} onclick={resetDefault}>
    Reset default
</button>
