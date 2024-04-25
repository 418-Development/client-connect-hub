{
    /* import { useRef } from "react";*/
}
import Button from "./Button";
import { MilestoneObj } from "../interfaces/Milestone";
import Markdown from "./Markdown";

interface Props {
    milestone: MilestoneObj | null;
}

function MilestoneModal({ milestone }: Props) {
    {
        /*  const closeButton = useRef<HTMLButtonElement>(null); */
    }

    return (
        <div id="milestoneModal" className="modal fade">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <div>
                            <h5>
                                {milestone?.title}
                                {milestone?.isDone && <i className="bi bi-check2-circle ms-2" style={{ color: "#198754" }}></i>}
                            </h5>
                            <figcaption className="blockquote-footer m-0">{milestone?.estimatedEnd}</figcaption>
                        </div>
                        {/*  <Button ref={closeButton} kind="close" dismissModal={true} ariaLabel="Close"></Button> */}
                    </div>

                    <div className="modal-body">
                        <Markdown>{milestone?.description}</Markdown>
                    </div>

                    <div className="modal-footer">
                        <Button kind="secondary" dismissModal={true}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MilestoneModal;
