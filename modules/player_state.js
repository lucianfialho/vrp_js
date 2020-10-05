const cfg = require('../cfg/player_state')

const { getUserId } = require('../client/base')

(() => {
    on('playerSpawn', async(source, firstSpawn) => {
        console.log("asd")
        // const userId = await getUserId(source)

        
        // console.log(userId)
    })
})()

