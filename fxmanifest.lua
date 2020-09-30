fx_version 'cerulean'
games { 'rdr3', 'gta5' }

author 'Lucian Fialho'
description 'Example resource'
version '1.0.0'


dependency 'yarn'

-- What to run
server_scripts {
    'database/connect.js',
    'base.js'
}
