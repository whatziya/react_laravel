import { useEffect, useState } from "react"
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()

    useEffect ( () => {
        getUsers();
    }, [])

    const onDeleteClick = user => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
          return
        }
        axiosClient.delete(`/students/${user.id}`)
          .then(() => {
            setNotification('User was successfully deleted')
            getUsers()
          })
      }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/students')
          .then(({ data }) => {
            setLoading(false)
            setUsers(data.data)
          })
          .catch(() => {
            setLoading(false)
          })
      }

    return(
        <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Students</h1>
        <Link className="btn-add" to="/students/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Surname</th>
            <th>Lastname</th>
            <th>Birthdate</th>
            <th>Group</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.firstname}</td>
                <td>{u.surname}</td>
                <td>{u.lastname}</td>
                <td>{u.birthdate}</td>
                <td>{u.group}</td>
                <td>
                  <Link className="btn-edit" to={'/students/' + u.id}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
    )

}