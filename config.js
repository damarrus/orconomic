module.exports = {
    PHASE_ADD_PLAYERS :    1,
    PHASE_PREPARE :        2,
    PHASE_START_TURN :     3,
    PHASE_PROFIT :         4,
    PHASE_AUCTION :        5,
    PHASE_FATE_STARTUPS :  6,
    PHASE_BUILD_STARTUPS : 7,
    PHASE_END_TURN :       8,
    PHASE_WINTER :         9,
    
    ERROR_INVALID_PHASE : {code: 1,message: 'Неправильная фаза'},
    ERROR_PLAYER_ALREADY_SET : {code: 2,message: 'Игрок уже установлен'},
};

