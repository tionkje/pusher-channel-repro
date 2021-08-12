
import dotenv from 'dotenv';
dotenv.config();

import Pusher from 'pusher';
import { PUSHER_KEY, PUSHER_CLUSTER } from '$lib/Env';
const { PUSHER_SECRET, PUSHER_APPID } = process.env;

const pusher = new Pusher({
  appId: PUSHER_APPID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: PUSHER_CLUSTER,
  useTLS: true,
});

export async function get(){
  const newVal = Math.round(Date.now()/500%100);
  console.log(newVal);
  pusher.trigger(`counter`, 'next', newVal);
  return { body: newVal+'' }
}
