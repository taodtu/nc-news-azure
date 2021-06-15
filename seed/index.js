const {seedTable} = require("../model/seedTable");

module.exports = async function (context) {

    try{
        await seedTable();
        context.res = {
        status: 200, /* Defaults to 200 */
        body: "seeding successfull"
    };}catch(e){
        console.log(e)
    }
}