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

{#if items.length === 0}
  <p class="empty">No numbers drawn yet.</p>
{:else}
  <ul>
    {#each items as item (item.number)}
      <li class:redeemed={item.redeemed}>
        <span class="num">{formatNumber(item.number, state.pad)}</span>
        <button
          class="check"
          class:on={item.redeemed}
          aria-pressed={item.redeemed}
          title="Mark as redeemed"
          onclick={() => (item.redeemed = !item.redeemed)}
        >✓</button>
        <button class="del" title="Delete (this number can be rolled again)" onclick={() => remove(item.number)}>✕</button>
      </li>
    {/each}
  </ul>
  <button onclick={clearAll}>Clear all</button>
{/if}
