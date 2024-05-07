interface Props {
    gravatar: string;
}

function Gravatar({ gravatar }: Props) {
    return <img className="gravatar" src={`https://www.gravatar.com/avatar/${gravatar}?s=32&d=retro&r=PG`} alt="gravatar" />;
}

export default Gravatar;
