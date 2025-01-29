import jwt from 'jsonwebtoken';

export const login = (req,res)=>{
    const{username, password}= req.body;

    if(!username || !password){
        return res.json("enter credentials");
    }
    if(username==="foodchow_admin" && password==="foodchow_pos"){
        const token= jwt.sign({username: username}, process.env.JWT_SECRET);
        return res.json({token: token});
    }else return res.json("Invalid credentials");
}