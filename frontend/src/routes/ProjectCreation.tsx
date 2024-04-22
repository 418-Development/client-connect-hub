import { useContext, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Timeline from "../components/Timeline";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import UserAssignment from "../components/UserAssignment";
import { ProjectObj, ProjectRespondsObj } from "../interfaces/Project";

interface Props {
    isEditing?: boolean;
}

function ProjectCreation({ isEditing = false }: Props) {
    const userInfo = useContext(UserContext);
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<ProjectObj | null>(null);
    const descriptionTextArea = useRef<HTMLTextAreaElement>(null);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        if (id !== undefined) fetchProjects(id);
    }, [id]);

    const fetchProjects = async (projectId: number | string) => {
        const url = (import.meta.env.VITE_API_URL as string) + `projects/get/${projectId}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: document.cookie.substring(6),
            },
        });

        if (response.ok) {
            const json = await response.json();
            const projectResponse = json as ProjectRespondsObj;
            const curProject = {
                id: projectResponse.projectId,
                title: projectResponse.projectName,
                estimatedEnd: projectResponse.estimateDate,
                startDate: projectResponse.startDate,
                description: projectResponse.description,
                milestones: [],
            };
            setProject(curProject);

            console.log("Set project", project, json);
            if (curProject) {
                setTitle(curProject.title);
                setDescription(curProject.description);
                setStartDate(curProject.startDate.split("T")[0]);
                setEndDate(curProject.estimatedEnd.split("T")[0]);
            }
        } else {
            setProject(null);
        }
    };

    const createProject = async () => {
        if (!userInfo) return;

        const currentDate = new Date();
        const url = (import.meta.env.VITE_API_URL as string) + "projects/create-project";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: document.cookie.substring(6),
            },
            body: JSON.stringify({
                projectId: 0,
                projectName: title,
                description: description,
                creatorId: userInfo?.id,
                createdDate: currentDate.toISOString(),
                startDate: startDate,
                estimateDate: endDate,
                milestones: [],
            }),
        });

        console.log(url, response.ok, response.status);

        if (response.ok) {
            const json = await response.json();

            const project = json as ProjectRespondsObj;

            console.log("json", json);
            navigate(`/edit-project/${project.projectId}`);
        }
    };

    const updateProject = async () => {
        if (!userInfo) return;

        const currentDate = new Date();
        const url = (import.meta.env.VITE_API_URL as string) + `projects/update-project/${id}`;

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: document.cookie.substring(6),
            },
            body: JSON.stringify({
                projectId: id,
                projectName: title,
                description: description,
                startDate: startDate,
                estimateDate: endDate,
                milestones: [],
            }),
        });

        console.log(url, response.ok, response.status);

        if (response.ok) {
            navigate(`/edit-project/${id}`);
        }
    };

    return (
        <div className="container">
            <form
                action=""
                onSubmit={(e) => {
                    e.preventDefault();
                    if (isEditing) {
                        updateProject();
                    } else {
                        createProject();
                    }
                }}
                className="mt-3"
            >
                <div className="mt-3">
                    <div>
                        <label htmlFor="projectTitle">Project title</label>
                        <input
                            type="text"
                            autoComplete="title"
                            className="form-control"
                            id="projectTitle"
                            placeholder="Enter title"
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            value={title}
                            required
                        />
                        <div className="invalid-feedback"></div>
                    </div>
                </div>
                <div className="mt-3">
                    <div>
                        <label htmlFor="projectDescription">Project description</label>
                        <textarea
                            ref={descriptionTextArea}
                            autoComplete="description"
                            className="form-control"
                            id="projectDescription"
                            placeholder="Enter description"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            value={description}
                            onInput={() => {
                                if (descriptionTextArea.current) {
                                    descriptionTextArea.current.style.height = "auto";
                                    descriptionTextArea.current.style.height = `${descriptionTextArea.current.scrollHeight + 2}px`;
                                }
                            }}
                            required
                        />
                        <div className="invalid-feedback"></div>
                    </div>
                </div>
                <div className="mt-3">
                    <div>
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="startDate"
                            placeholder=""
                            onChange={(e) => {
                                setStartDate(e.target.value);
                            }}
                            value={startDate}
                            required
                        />
                        <div className="invalid-feedback"></div>
                    </div>
                </div>
                <div className="mt-3">
                    <div>
                        <label htmlFor="endDate">Estimated End Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="endDate"
                            placeholder=""
                            onChange={(e) => {
                                setEndDate(e.target.value);
                            }}
                            value={endDate}
                            required
                        />
                        <div className="invalid-feedback"></div>
                    </div>
                </div>
                {isEditing ? (
                    <div>
                        <Button type="submit" style="primary" className="mt-3 me-3">
                            Save Changes
                        </Button>
                        <Button style="secondary" className="mt-3">
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button type="submit" style="primary" className="mt-3 me-3">
                            Create Project
                        </Button>
                        <Button style="secondary" className="mt-3">
                            Cancel
                        </Button>
                    </div>
                )}
            </form>

            {isEditing ? (
                <form className="mt-3">
                    <div>
                        <div>
                            <UserAssignment />
                        </div>
                    </div>
                </form>
            ) : (
                <div />
            )}

            {isEditing ? (
                <form className="mt-3">
                    <div>
                        <div>
                            <p>PLaceholder for the milestone Adding/Editing UI</p>
                            <Timeline
                                milestones={[
                                    {
                                        id: "milestone0",
                                        title: "Milestone 1",
                                        estimatedEnd: "01.04.2024",
                                        isDone: true,
                                    },
                                    {
                                        id: "milestone1",
                                        title: "Milestone 1",
                                        estimatedEnd: "01.04.2024",
                                        isDone: true,
                                    },
                                    {
                                        id: "milestone2",
                                        title: "Milestone 2",
                                        estimatedEnd: "06.04.2024",
                                        isDone: true,
                                    },
                                    {
                                        id: "milestone3",
                                        title: "Milestone 3",
                                        estimatedEnd: "18.04.2024",
                                        isDone: false,
                                    },
                                ]}
                                onlyShowOverview
                            />
                        </div>
                    </div>
                    <div>
                        <Button type="submit" style="primary" className="mt-3 me-3">
                            Save Changes
                        </Button>
                        <Button style="secondary" className="mt-3">
                            Cancel
                        </Button>
                    </div>
                </form>
            ) : (
                <div />
            )}
        </div>
    );
}

export default ProjectCreation;
