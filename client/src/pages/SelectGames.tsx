import Steam, { User } from "../lib/steam";
import UserContext from "../UserContext";
import { useContext, useEffect, useState } from "react";


const SelectGames = () => {
    const user = useContext(UserContext);
    const [hostGamesArr, setHostGamesArr] = useState<User[]>();

    useEffect(() => {
        if(user) {
            const steam = new Steam(user.token);

            const getInfo = async () => {
                const hostUser = await steam.getUserById(user.steamId);
                const hostGames = 
                    await hostUser.fetchGames();
                console.log(hostGames);
            };

            getInfo();

        }
    })
    return (
        <div>
            Hello There
            This is like intro text
        </div>
    )
}

export default SelectGames;