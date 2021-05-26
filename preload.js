const { contextBridge } = require('electron');
const osu = require('node-os-utils');
const cpu = osu.cpu;
const mem = osu.mem;


osu.options.INTERVAL = 1000;

let test = () => cpu.usage()
    .then(info => {
        console.log(info)
    })
test();

let cpuAverageUsage = () => cpu.usage()
    .then(info => {        
      return info;
    })

let cpuFreePercentage = () => cpu.free()
    .then(info => {
        return info;
    })

let cpuFreeMemory = () => mem.free()
    .then(info => {
        return info;
    })

let cpuUsedMemory = () => mem.used()
    .then(info => {
        return info;
    })
   

contextBridge.exposeInMainWorld('electron', {    
    cpuAverageUsage: { cpuAverageUsage },
    cpuFreePercentage: { cpuFreePercentage },
    cpuFreeMemory: { cpuFreeMemory },
    cpuUsedMemory: { cpuUsedMemory }
})