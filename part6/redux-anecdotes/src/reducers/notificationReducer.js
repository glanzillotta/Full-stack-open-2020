const notificationReducer =(state = 'START', action)=>{
    switch(action.type){
        case 'START':
            return state;

        default: return state
    }
}

export default notificationReducer