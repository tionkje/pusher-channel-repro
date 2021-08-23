import Ably from 'ably';
const { ABLY_API_KEY } = process.env;

const ably = new Ably.Realtime(ABLY_API_KEY);

export async function get(){
  const newVal = Math.round(Date.now()/500%100);
  console.log(newVal);
  const channel = ably.channels.get('counter');
  // Publish a message to the test channel
  channel.publish('next',newVal+'');
  return { body: newVal+'' }
}
