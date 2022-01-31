import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis'


describe('bullmq can use ioredis-mock', () => {
  it('connects', async () => {
    const connection = new Redis();

// Reuse the ioredis instance
const myQueue = new Queue('myqueue', { connection });
const myWorker = new Worker('myworker', async (job)=>{
console.log('myWorker.job', {job})

}, { connection });

console.log({myQueue, myWorker})


await new Promise(resolve => {
  return setTimeout(resolve, 1500)
})

connection.disconnect()
  })
})