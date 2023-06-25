require("dotenv").config();
const {user} = require("../../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateUserGoogle = async (req, res) => {
  console.log(req.user,"inside");
    let oldUser = await user.findAll({ where: { email: req.user.email } });
    if(oldUser){
        const Token = await jwt.sign({name:oldUser.name,role:oldUser.role,email:oldUser.email},"djdhjzbyw8ry89y",{ expiresIn: "1d" });
        const refreshToken = await jwt.sign({name:oldUser.name,role:oldUser.role,email:oldUser.email},"w8yr893ur8943yr8y389",{ expiresIn: "7d" });
        res.cookie("token", Token);
        res.cookie("refreshToken", refreshToken);
        res.redirect("http://localhost:3000/")
        res.status(202).send({isError:false,Msg:"Login Success",token:Token,refreshToken:refreshToken});
        
    } else {
        req.user.password = bcrypt.hashSync(req.user.password, 2);
        let newUser = await user.create({
            ...req.user
        })
        const Token = await jwt.sign({name:user.name,role:user.role,email:user.email},"djdhjzbyw8ry89y",{ expiresIn: "1d" });
        const refreshToken = await jwt.sign({name:user.name,role:user.role,email:user.email},"w8yr893ur8943yr8y389",{ expiresIn: "7d" });
        res.cookie("token", Token);
        res.cookie("refreshToken", refreshToken);
        
        res.status(202).send({isError:false,Msg:"Login Success",token:Token,refreshToken:refreshToken});
        res.redirect("http://localhost:3000/")
        
    }
};

const validateUserGithub =async (req, res) => {
        const { code } = req.query;
        const acces_Token = await fetch(
          "https://github.com/login/oauth/access_token",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "content-type": "application/json",
            },
            body: JSON.stringify({
              client_id: "7a02ed9aca9cc8c1c9bf",
              client_secret: "2c3e730de6ec3814a0d28ab00cac21ca7e27ca54",
              code,
            }),
          }
        ).then((res) => res.json());
        const userGet = await fetch("https://api.github.com/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${acces_Token.access_token}`,
            "content-type": "application/json",
          },
        }).then((res) => res.json());
        const user_Email = await fetch("https://api.github.com/user/emails", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${acces_Token.access_token}`,
            "content-type": "application/json",
          },
        }).then((res) => res.json());
        let user_details = {
          name: userGet.name,
          email: user_Email[0].email,
          password: uuidv4(),
          avtar: user.avatar_url,
          role: "user",
        }

        let oldUser = await user.findAll({ where: { email: req.user_details.email } });
        if(oldUser){
        const Token = await jwt.sign({name:oldUser.name,role:oldUser.role,email:oldUser.email},"djdhjzbyw8ry89y",{ expiresIn: "1d" });
        const refreshToken = await jwt.sign({name:oldUser.name,role:oldUser.role,email:oldUser.email},"w8yr893ur8943yr8y389",{ expiresIn: "7d" });
        res.cookie("token", Token);
        res.cookie("refreshToken", refreshToken);
        res.status(202).send({isError:false,Msg:"Login Success",token:Token,refreshToken:refreshToken});
    } else {
        req.user_details.password = bcrypt.hashSync(req.user_details.password, 2);
        let newUser = await user.create({
            ...req.user_details
        })
        const Token = await jwt.sign({name:user_details.name,role:user_details.role,email:user_details.email},"djdhjzbyw8ry89y",{ expiresIn: "1d" });
        const refreshToken = await jwt.sign({name:user_details.name,role:user_details.role,email:user_details.email},"w8yr893ur8943yr8y389",{ expiresIn: "7d" });
        res.cookie("token", Token);
        res.cookie("refreshToken", refreshToken);
        res.status(202).send({isError:false,Msg:"Login Success",token:Token,refreshToken:refreshToken});
    }
};

module.exports={
    validateUserGoogle,
    validateUserGithub
}