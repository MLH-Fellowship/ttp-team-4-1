const players = [];

const addPlayer = ({ id, name }) =>
{
    name = name.trim().toLowerCase();

    const existingPlayer = players.find((player) => player.name === name);
    if(!name) return { error: "Username cannot be empty" };
    if(existingPlayer) return { error: "Username is taken" };

    const player = { id, name };
    players.push(player);

    return { player };
};

const removePlayer = (id) =>
{
    players.filter((player) => player.id !== id);
};

const getPlayer = (id) => players.find((player) => player.id === id);

module.exports = { addPlayer, removePlayer, getPlayer };