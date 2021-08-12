<script lang="ts">
  import { onMount } from 'svelte';
  import { PUSHER_KEY, PUSHER_CLUSTER } from '$lib/Env';
  import Pusher from 'pusher-js';
  let number = 0;
  onMount(() => {
    Pusher.logToConsole = true;

    var pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
    });

    var channel = pusher.subscribe(`counter`);
    channel.bind('next', (data) => {
      console.log(data);
      number = data;
    });
  });

  async function click(){
    const res = await fetch('/push');
    number = Number(await res.text());
  }
</script>

<button on:click={click}>Click me: {number}</button>
