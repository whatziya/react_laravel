import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"
import { useStateContext } from "../contexts/ContextProvider";

export default function StudentForm(){
    let {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        firstname: '',
        surname: '',
        lastname: '',
        birthdate: '',
        group: '',
        user_id: ''
    })
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()
    
    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/students/${id}`)
                .then(({data}) => {
                    setLoading(false)
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }
    const onSubmit = (ev) => {
        ev.preventDefault();
        if (user.id) {
            axiosClient.put(`/students/${user.id}`,user)
                .then(() => {
                    setNotification('User was successfully updated')
                    navigate('/students')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                      setErrors(response.data.errors)
                    }
                  })
        } else {
            axiosClient.post(`/students`,user)
                .then(() => {
                    setNotification('User was successfully updated')
                    navigate('/students')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                      setErrors(response.data.errors)
                    }
                  })
        }

    }
    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                    </div>
                }
                {!loading && 
                    <form onSubmit={onSubmit}>
                        <input value={user.firstname} onChange={ev => setUser({...user, firstname: ev.target.value})} placeholder="Firstname"/>
                        <input value={user.surname} onChange={ev => setUser({...user, surname: ev.target.value})} placeholder="Surname"/>
                        <input value={user.lastname} onChange={ev => setUser({...user, lastname: ev.target.value})} placeholder="Lastname"/>
                        <input type="date" value={user.birthdate} onChange={ev => setUser({...user, birthdate: ev.target.value})} placeholder="Birthdate"/>
                        <input value={user.group} onChange={ev => setUser({...user, group: ev.target.value})} placeholder="Group"/>
                        <button className="btn">Save</button>
                    </form>
                }
            </div>
        </>
    )
}