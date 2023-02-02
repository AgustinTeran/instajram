var initialState = {
    user: {},
    profile: {},
    users: []
}


export default function Reducer(state=initialState,action){
    switch (action.type){
        case "USER": 
            return ({
                ...state,
                user: action.payload
            })
        case "PERFIL_USUARIO": 
            return ({
                ...state,
                user: action.payload
            })
        case "PERFIL": 
            return ({
                ...state,
                profile: action.payload
            })
        case "USERS":
            return ({
                ...state,
                users: action.payload
            })
        default: return ({
            ...state
        })
    }
}