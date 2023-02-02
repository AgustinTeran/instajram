import axios from "axios"

var back = axios.create({baseURL:"https://instajram-l8bb.vercel.app"})

export function CreateUser(obj){
    return function (dispatch){
        back.post("/users",obj)
        .then(res => {
            if(res.data){
                localStorage.setItem("token",res.data)
                window.location.replace("/")
            }else{
                alert("Ya existe un usuario con ese nombre o email")
            }
        })
        .catch(err => console.log(err))
    }
}

// export function UsersList(){
//     return function (dispatch){
//         back.get("/users")
//         .then(res => dispatch({type: "USERS",payload: res.data}))
//         .catch(err => console.error(err))
//     }
// }

export function SearchUser(search){
    return function(dispatch){
        back.get(`/users?search=${search}`)
        .then(res => dispatch({type: "USERS", payload: res.data}))
        .catch(err => console.error(err))
    }
}

export function Auth(obj){
    return function (dispatch){
        back.post("/users/auth",obj)
        .then(res => {
            if(res.data){
                localStorage.setItem("token",res.data)
                window.location.replace("/")
            }
        })
        .catch(err => alert(err.response.data))
    }
}

export function Perfil(){
    return function (dispatch){
        back.get(`/users/perfil`,{headers: {token: localStorage.getItem("token")}})
        .then(res => dispatch({type:"PERFIL",payload: res.data}))
        .catch(err => {
            alert("Token ivalido")
            localStorage.removeItem("token")
        })
    }
}

export function PerfilUsuario(username){
    return function (dispatch){
        back.get(`/users/perfil?name=${username}`,{headers: {token: localStorage.getItem("token")}})
        .then(res => {dispatch({type:"PERFIL_USUARIO",payload: res.data})})
        .catch(err => console.error(err))
    }
}

export function Seguir(name,followName){
    return function(dispatch){
        back.post("/users/follow",{name,followName},{headers: {token: localStorage.getItem("token")}})
        .then(res => dispatch(Perfil(localStorage.user)))
        .catch(err => console.error(err))
    }
}

export function DejarSeguir(name,followName){
    return function(dispatch){
        back.delete("/users/unfollow",{
            params: {
                name,followName
            },
            headers: {
                token: localStorage.getItem("token")
            }
        })
        .then(res => dispatch(Perfil(localStorage.user)))
        .catch(err => console.error(err))
    }
}