import { ProjectObj } from "../interfaces/Project";

interface Props {
    project: ProjectObj;
}

function EditMilestones({ project }: Props) {
    return (
        <form className="mt-3">
            <h2>Milestones</h2>
        </form>
    );
}

export default EditMilestones;
