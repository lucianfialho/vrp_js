const UserModel = require('./database/model/User')

const getsteamIdentifier = () => {
    
    const player = global.source;

    let steamIdentifier = null;

    for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
        const identifier = GetPlayerIdentifier(player, i);

        if (identifier.includes('steam:')) {
            steamIdentifier = identifier;
        }
    }

    return steamIdentifier
}

( ()=>{
    on('playerConnecting', async(name, setKickReason, deferrals) => {
        deferrals.defer()

        deferrals.update(`Olá ${name}. Estamos confirmando seu STEAMID.`)
        
        let source = global.source

        const steamIdentifier = getsteamIdentifier();    
        const User =  await UserModel.findOne({ steamId: steamIdentifier }).populate('characters').exec()

        if(!User) {
            deferrals.update(`Usuário não encontrado, criando usuário`)

            const User = new UserModel({
                steamId: steamIdentifier,
                queue_priority: 0,
                banned: false,
                bannedBy: "Não afetado.",
                personLimit: 1
            })

            User.save(function (err) {
                if (err) return deferrals.done(`Deu merda passa esse erro para um administrador: ${err}`)

                deferrals.done(`Parece que é seu primeiro login envie para a equipe de administração o seu ID: ${User._id}`)
            })

        } else {

            deferrals.update(`Achamos você aqui agora aguarda um pouco que eu vou puxar seus personagens`)

            if(User.banned) return deferrals.done(`Brow tu come merda? Tu chitou no bonde do cebola e quer aparecer aqui com essa cara lavada, vai dar esse cu!`)

            if(!User.whitelisted) return deferrals.done(`Parece que é seu primeiro login envie para a equipe de administração o seu ID: ${User._id}`)
            
            if(User.characters.length < 1) {
                emit("vRP:playerJoin", steamIdentifier, source)
                return deferrals.done()
            }

            deferrals.done()
        }
    });
    
})()
