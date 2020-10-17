const CharacterModel = require('./database/model/Character');
const PositionModel = require('./database/model/Position');

const _sym = '123467890'
const registrationNumberLength = 11
const phoneNumberLength = 9

const generateRegistrationNumber = async() => {

    let registrationNumber = generateRandomNumbers(registrationNumberLength)
    
    const character = await CharacterModel.findOne({registration: registrationNumber}).exec()
    
    if(!character) return registrationNumber
        
    generateRegistrationNumber(registrationNumberLength)
}

const generatePhoneNumber = async() => {

    let phoneNumber = generateRandomNumbers(phoneNumberLength)

    const character = await CharacterModel.findOne({phone: phoneNumber}).exec()
    if(!character) return phoneNumber
        
    generatePhoneNumber(phoneNumberLength)
}

const generateRandomNumbers = (length) => {

    let number = ''

    for (let index = 0; index < length; index++) {
        number += _sym[parseInt(Math.random() * (_sym.length))]
    }

    return number
}

(() => {
    on('vRP:playerJoin', async(steamIdentifier, source) => {
    
        const registration = await generateRegistrationNumber()
        const phone = await generatePhoneNumber()

        const userBySteamIdentifier = await UserModel.findOne({ steamId: steamIdentifier }).exec()
        
        const Character = await CharacterModel.create({
            user: userBySteamIdentifier._id,
            registration: registration,
            phone: phone,
        })

        await Character.save()

        userBySteamIdentifier.characters.push(Character)

        await userBySteamIdentifier.save()

        if(Character.firstSpawn) {
            const Position = PositionModel.create({
                character: Character._id
            })

            await Position.save()
        }
    })
})()

