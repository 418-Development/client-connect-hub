import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";

interface Props {
    email: string;
}

function Gravatar({ email }: Props) {
    const [gravatarUrl, setGravatarUrl] = useState("");
    useEffect(() => {
        const hashedEmail = CryptoJS.SHA256(email);
        setGravatarUrl(`https://www.gravatar.com/avatar/${hashedEmail}?s=32&d=retro&r=PG`);
    }, [email]);

    return <img className="gravatar" src={gravatarUrl} alt="gravatar" />;
}

export default Gravatar;
