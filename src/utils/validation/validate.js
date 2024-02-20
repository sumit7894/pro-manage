export const checkName = (name)=>{
    
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/ && /^.{1,50}$/;
    if(!name?.trim())
    {
        return "Please enter a valid name"
    }
    if(name.length >50){
        return "Name is too long";
    }
    else if(!nameRegex.test(name)){
        return "Please enter a valid name";
    }else{
        return "";
    } 
}
export const checkEmail =(email)=>{
    const isEmailValid = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email);
    if(isEmailValid)
    {
        return ""
    }else{
        return "Please enter a valid email"
    }
}
export const checkPassword =(password)=>{
    if(password.trim().length <5)
    {
        return "Password must contain at least 5 characters long without spaces"
    }else
    {
        return "";
    }
}
export const checkConfirmPassword = (password,confirmPassword)=>{
    if(password !== confirmPassword)
    {
        return "Passwords don't match"
    }else{
        return "";
    }
}