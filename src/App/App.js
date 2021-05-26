import React from 'react';

import './App.css';


export default function App() {

    /* const [averageUsage, setCpuAverageUsage] = React.useState(''); //средняя загрузка цп
    const [freePercentage, setCpuFreePercentage] = React.useState(''); // Процент загрузки процессора
    const [freeMemory, setCpuFreeMemory] = React.useState(''); // Свободная память
    const [usedMemory, setCpuUsedMemory] = React.useState('') // Используемая память  */

    const [pcstate, setPCState] = React.useState({});

    
    
    React.useEffect(() => {
        const cpuAverageUsage = window.electron.cpuAverageUsage.cpuAverageUsage();
        /* cpuAverageUsage.then((info) => { setCpuAverageUsage(info) });  */
    
        console.log(cpuAverageUsage)
    
        const cpuFreePercentage = window.electron.cpuFreePercentage.cpuFreePercentage();
        /* cpuFreePercentage.then((info) => { setCpuFreePercentage(info) }); */
    
        const cpuFreeMemory = window.electron.cpuFreeMemory.cpuFreeMemory();
        /* cpuFreeMemory.then((info) => { setCpuFreeMemory(info.freeMemMb) }) */
    
        const cpuUsedMemory = window.electron.cpuUsedMemory.cpuUsedMemory();
        /* cpuUsedMemory.then((info) => { setCpuUsedMemory(info.usedMemMb) }) */
    
        const promises = [cpuAverageUsage, cpuFreePercentage, cpuFreeMemory, cpuUsedMemory];

        Promise.all(promises)
            .then(([cpuAverageUsage, cpuFreePercentage, cpuFreeMemory, cpuUsedMemory]) => {
                let newObj = { cpuAverageUsage: cpuAverageUsage.toFixed(2), cpuFreePercentage: cpuFreePercentage.toFixed(2), cpuFreeMemory: cpuFreeMemory.freeMemMb.toFixed(2), cpuUsedMemory: cpuUsedMemory.usedMemMb.toFixed(2) }
                setPCState(newObj);
            })
    }, [pcstate]);
    

    return (
        <div className="app">
            <h1 className="app__title">PC Monitor</h1>            
                <div className="app__list">
                    <div className="app__item">
                        <h3 className="app__item_title">Средняя загрузка ЦП</h3>
                        <p className="app__item_data">  {pcstate.cpuAverageUsage}%</p>
                    </div>
                    <div className="app__item">
                        <h3 className="app__item_title">Неиспользуемая мощность ЦПУ</h3>
                        <p className="app__item_data">  {pcstate.cpuFreePercentage}%</p>
                    </div>
                    <div className="app__item">
                        <h3 className="app__item_title">Свободное пространство памяти (mb)</h3>
                        <p className="app__item_data">  {pcstate.cpuFreeMemory}</p>
                    </div>
                    <div className="app__item">
                        <h3 className="app__item_title">Используемое пространство памяти (mb)</h3>
                        <p className="app__item_data">  {pcstate.cpuUsedMemory}</p>
                    </div>
                </div>                
            </div>        
    )
}