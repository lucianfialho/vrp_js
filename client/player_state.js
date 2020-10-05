const stateReady = false

setTick(async() => {
    await Wait(10000)
    console.log(IsPlayerPlaying(PlayerId() && stateReady))

});
