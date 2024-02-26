export const BASE_URL = "http://localhost:3002"

export const findColor = (priority)=>{
    // console.log()
    if(priority ==="High"){
        return "#FF2473"
    }else if(priority ==="Moderate"){
        return "#18B0FF"
    }else{
        return "#63C05B"
    }
}