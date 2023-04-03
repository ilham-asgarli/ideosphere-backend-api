const runBusinessRules = (...logics) => {

    for(let logic of logics){
        if(!logic.success){
            return logic
        }
    }

    return null
}

module.exports = runBusinessRules
