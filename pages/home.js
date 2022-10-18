import { useEffect, useState } from "react"

export default function Home(){
    const [tasksData, setTasksData] = useState([]);

    useEffect(() => {
        console.log("Effect for the GET resquest")
        fetch("http://localhost:8888/v1/task")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTasksData(data)})
    }, [])

    const mappedtasks = tasksData.map( task => {
        return <div key={task.id} className="grid-item">
                    <h3>{task.name}</h3>
                    <span>{task.status}</span>
                    <p>{task.description}</p>
                </div>
    });

    return(
        <div className="main-container grid-centered-container">
            <div className="grid-header">
                <h1>Tasks list</h1>
            </div>
            {mappedtasks}
        </div>
    )
}