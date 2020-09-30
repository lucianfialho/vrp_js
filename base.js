const UserModel = require('./database/model/User')
const CharacterModel = require('./database/model/Character');
const Character = require('./database/model/Character');

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


on('playerConnecting', (name, setKickReason, deferrals) => {
    deferrals.defer()
    
    deferrals.update(`Olá ${name}. Estamos confirmando seu STEAMID.`)
    
    let source = global.source
    
    const steamIdentifier = getsteamIdentifier();
    
    UserModel.findOne({ steamId: steamIdentifier }, (err, result) => {
        deferrals.update(`Procurando seu usuário na nossa base`)
        if(!result) {
            deferrals.update(`Usuário não encontrado, criando usuário`)
           
            const user = new UserModel({ 
                steamId: steamIdentifier,
                queue_priority: 0,
                banned: false,
                bannedBy: "Não afetado.",
                personLimit: 1
            })

            user.save(function (err) {
                if (err) return deferrals.update(`Deu merda passa esse erro para um administrador: ${err}`)
                deferrals.update(`Usuário criado com sucesso`)
            })

        } else {
            deferrals.update(`Achamos você aqui agora aguarda um pouco que eu vou puxar seus personagens`)
            
            if(result.banned) return deferrals.done(`Brow tu come merda? Tu chitou no bonde do cebola e quer aparecer aqui com essa cara lavada, vai dar esse cu!`)
            if(!result.whitelisted) return deferrals.done(`Parece que é seu primeiro login envie para a equipe de administração o seu ID: ${result._id}`)

            deferrals.done()

        }
    });
});
