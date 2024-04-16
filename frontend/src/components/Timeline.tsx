import Button from "./Button";

function Timeline() {
    return (
        <ul className="timeline">
            <li className="pt-2 pb-2 is-done">
                <Button outline={true} className="ms-3">
                    Milestone 1
                </Button>
                <Button outline={true} style="danger" className="ms-2">
                    X
                </Button>
            </li>
            <li className="pt-2 pb-2 is-active">
                <Button outline={true} className="ms-3">
                    Milestone 2
                </Button>
                <Button outline={true} style="success" className="ms-2">
                    ✓
                </Button>
            </li>
            <li className="pt-2 pb-2">
                <Button outline={true} className="ms-3">
                    Milestone 3
                </Button>
            </li>
        </ul>
    );
}

export default Timeline;
