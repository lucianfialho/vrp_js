
const getUserId = (source) => {
	if(!source) {
		const playerIdentifiers = GetPlayerIdentifiers(source)
		console.log(playerIdentifiers)
	}
}

const getPosition = () => {
    const {x, y, z} = GetEntityCoords(PlayerPedId(),true)
	return x,y,z
}

const isInside = () => {
    const {x, y, z} = tvRP.getPosition()
    return !(GetInteriorAtCoords(x,y,z) == 0)
}

const getCamDirection = () => {
	const heading = GetGameplayCamRelativeHeading() + GetEntityHeading(PlayerPedId())
	const pitch = GetGameplayCamRelativePitch()
	const x = -math.sin(heading*math.pi/180.0)
	const y = math.cos(heading*math.pi/180.0)
	const z = math.sin(pitch*math.pi/180.0)
	const len = math.sqrt(x*x+y*y+z*z)
    
    if (len !== 0) {
		x = x/len
		y = y/len
		z = z/len
	}

    return x, y, z
}

const getNearestPlayers = (radius) => {
	const r = {}
	const ped = GetPlayerPed(i)
	const pid = PlayerId()
	const px, py, pz = tvRP.getPosition()

    
}

module.exports = {
    getPosition,
    isInside,
    getCamDirection,
	getNearestPlayers,
	getUserId,
}