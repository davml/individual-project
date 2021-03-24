import jwt from 'jsonwebtoken'

const auth = async (req, res, next ) => {
    try {
        const token = req.headers.Authorization.split(" ")[1];
        const isJWT = token.length < 500;

        let decodedData; 

        if(token && isJWT){
            decodedData = JWT.verify(token, 'test');

            req.userId = decodedData?.id;
        }
        else {
            decodedData = JWT.decode(token);

            req.userId = decodedData?.sub;
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;