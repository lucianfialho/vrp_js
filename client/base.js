(() => {

	global.on(
		'onClientGameTypeStart', 
		async (resourceName) => {
			await emitNet('vRP:onClientGameTypeStart')
			
		}
	)


	global.onNet(
		'cliOnClientGameTypeStart', 
		async (characterPosition) => {
			exports.spawnmanagerjs.setAutoSpawnCallback(() => {
				exports.spawnmanagerjs.spawnPlayer({
					x: characterPosition.x, // characterPosition.x
					y: characterPosition.y, // characterPosition.y
					z: characterPosition.z, // characterPosition.z
					model: 'a_m_y_epsilon_02'
				}, (spawn) => {
					console.log(spawn)
				})
			})
		
			exports.spawnmanagerjs.setAutoSpawn(true)
			exports.spawnmanagerjs.forceRespawn()
		}
	)
})()

