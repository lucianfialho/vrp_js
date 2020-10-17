(() => {
   
    const UserModel = require('./database/model/User');
    const PositionModel = require('./database/model/Position');

    const getUser = async() => {
        const steamIdentifier = getsteamIdentifier()
        return await UserModel.findOne({ steamId: steamIdentifier }).populate('characters').exec()
    }

    const getCharacterPosition = async(characterId) => {
        return await PositionModel.findOne({ character: characterId }).exec()
    }

    global.onNet(
        'vRP:onClientGameTypeStart',
        async () => {
            let source = global.source
            const user = await getUser();
            const characterPosition = await getCharacterPosition(user.characters[0]._id)
            
            const position = {
                x: characterPosition.x,
                y: characterPosition.y,
                z: characterPosition.z
            }
            
            global.emitNet("cliOnClientGameTypeStart", source, position);
        }
    )
})()