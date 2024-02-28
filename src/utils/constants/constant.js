import { format } from "date-fns"

export const BASE_URL = "https://pro-manage-backend-nd28.onrender.com"

export const findColor = (priority)=>{
    if(priority ==="High"){
        return "#FF2473"
    }else if(priority ==="Moderate"){
        return "#18B0FF"
    }else{
        return "#63C05B"
    }
}

export const compareDate =(dueDate)=>{
    if(!dueDate){
        return false;
    }
    const formattedDueDate = new Date(dueDate);
    const currentDate = new Date();
    if(formattedDueDate>currentDate){
        return true;
    }else{
        return false;
    }
}

export const getFormattedDate =(dueDate)=>{
    if(!dueDate){
        return;
    }
    const formattedDueDate = format(dueDate, 'do MMM');
    return formattedDueDate;
}