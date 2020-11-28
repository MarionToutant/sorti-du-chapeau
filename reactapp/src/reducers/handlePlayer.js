export default function handlePlayer (playerList = [], action){
    if(action.type === 'addPlayer'){
        var idCount = 0;
        var playerListCopy = [...playerList];
        for(var i=0; i<playerListCopy.length; i++) {
            if(playerListCopy[i].id === action.id) {
                playerListCopy.splice(i, 1, {name: action.name, email: action.email, id: i})
                idCount = 1;
            }
        }
        if (idCount === 0) {
            playerListCopy.push({name: action.name, email: action.email, id: action.id});
        }
        idCount = 0;
        return playerListCopy;
    } else if(action.type === 'removePlayer') {
        var playerListCopyBis = [...playerList];
        playerListCopyBis.pop();
        return playerListCopyBis;
    } else{
        return playerList
    }
}