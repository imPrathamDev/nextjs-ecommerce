const mongooose = require('mongoose');

const connectdb = (handler) => {
    if(mongooose.connections[0].startSession){
        return handler;
    }
    
}