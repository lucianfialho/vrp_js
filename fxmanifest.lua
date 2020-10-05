fx_version 'cerulean'
games { 'rdr3', 'gta5' }

author 'Lucian Fialho'
description 'Example resource'
version '1.0.0'


dependency 'yarn'

-- What to run
server_scripts {
    'database/connect.js',
	'base.js',
	'modules/identity.js',
}

client_scripts {
	"wait.js",
	"client/player_state.js",
}

files {
	"loading/index.html",
	"loading/background.jpg",
	"loading/logo.png",
	"loading/css.css",
}
loadscreen "loading/index.html"