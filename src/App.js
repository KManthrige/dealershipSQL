import "./styles.css";
import { useState, useEffect } from "react"

export default function App() {
  const [database, setDatabase] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api")
        const jsonData = await response.json()
      } catch (error) {
        console.log("Error while fetching data", error)
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
  const fetchDataDB = async () => {
    try {
      const response = await fetch("/api/db")
      const jsonData = await response.json();
      setTimeout(() => {
        setDatabase(jsonData)
        setIsLoading(false)
      }, 1000)

    } catch (error) {
      console.log("error while fetching data from db", error)
      setIsLoading(false)
      setIsError(true)
    } 
  }
  fetchDataDB()
}, [])

if (isLoading) {
  return (
    <div>    Loading...
    </div>
  )
}

if (isError) {
  return (
    <div>Error!!!</div>
  )
}

  return (
    <>
    <h1>Dealership</h1>
    <h3> Buy your next car here! </h3>
    <div className="tableOutline">
      <table>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>Fuel</th>
            <th>Cost</th>
          </tr>
        </thead>
      <tbody>
        {database.map((item) =>
          <tr key={item.id}>
          <td>{item.brand}</td>
          <td>{item.model}</td>
          <td>{item.year}</td>
          <td>{item.color}</td>
          <td>{item.fuel}</td>
          <td>{item.cost}</td>
          </tr>
        )}
      </tbody>
      </table>
    </div>
    </>
  );
}
