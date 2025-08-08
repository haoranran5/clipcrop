
import { processTask, type WorkerTask } from './workerUtils'

self.onmessage = async (e: MessageEvent) => {
  const { tasks }:{ tasks: WorkerTask[] } = e.data
  const results: { id:number; ok:boolean; data?:ArrayBuffer; error?:string }[] = []
  for (let i=0;i<tasks.length;i++){
    const t = tasks[i]
    try {
      const blob = await processTask(t)
      const arr = await blob.arrayBuffer()
      // @ts-ignore
      self.postMessage({ type:'progress', done: i+1, total: tasks.length })
      results.push({ id: t.id, ok:true, data: arr })
    } catch (err:any) {
      results.push({ id: t.id, ok:false, error: String(err) })
    }
  }
  // @ts-ignore
  self.postMessage({ type:'done', results }, [ ...results.filter(r=>r.ok).map(r=>r.data).map(buf => buf as ArrayBuffer) ])
}
