
// error Handler Function

const errorHandler= ( err, req , res, next)=>{

    // check if response headers are already sent to client or user
    if(res.headersSent){

        res.status(200).jason({message:" response headers are successfully sent succesfully!"});
  
        // if true send err to next middleware
        return next(err);
    }

    const statusCode = res.statusCode && res.statusCode >= 400 ? res.statusCode:500;

    res.status(statusCode);

    if(process.env.NODE_ENV!== "production"){
        console.log(err);

    }

    res.json({message: err.message ,
        stack:process.env.NODE_ENV=== "production" ? null: err.stack,
    });

};


export default errorHandler;