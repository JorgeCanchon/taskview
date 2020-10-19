import axios from 'axios';
import * as constants from '../utils/constants';


export const GetAll = async () => {
    try{
        let result = await axios.get(constants.ENDPOINTS.TODOS.GET);
        let data = await result;
        return data;
    }catch(e){
        console.log(e);
        return { status: 500 };
    }
}

export const DeleteTodo = async id => {
    try{
        console.log(id);
        let result = await axios.delete(`${constants.ENDPOINTS.TODOS.DELETE}/${id}`);
        let data = await result;
        return data;
    }catch(e){
        console.log(e);
        return { status: 500 };
    }
}

export const AddTodo = async todo => {
    try{
        let result = await axios.post(constants.ENDPOINTS.TODOS.ADD, todo);
        let data = await result;
        return data;
    }catch(e){
        console.log(e);
        return { status: 500 };
    }
}