<script lang="ts">
  import { onMount } from 'svelte';
  import { PUSHER_KEY, PUSHER_CLUSTER, ABLY_API_KEY_READONLY } from '$lib/Env';
  import Pusher from 'pusher-js';
  let pusherNumber = 0, ablyNumber = 0;

  import Ably from 'ably';

  onMount(() => {
    Pusher.logToConsole = true;

    var pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
    });

    var channel = pusher.subscribe(`counter`);
    channel.bind('next', (data) => {
      console.log(data);
      pusherNumber = data;
    });

    var ably = new Ably.Realtime(ABLY_API_KEY_READONLY);
    var channel = ably.channels.get('counter');
    channel.subscribe(function(message) {
      if(message.name == 'next'){
        console.log(message);
        ablyNumber = Number(message.data);
      }
    });
  });

  async function clickPusher(){
    const res = await fetch('/push');
    pusherNumber = Number(await res.text());
  }
  async function clickAbly(){
    const res = await fetch('/ably');
    ablyNumber = Number(await res.text());
  }
</script>

<button on:click={clickPusher}>Pusher: {pusherNumber}</button>
<button on:click={clickAbly}>Ably: {ablyNumber}</button>
