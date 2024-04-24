import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import UserAssignment from "../components/UserAssignment";
import { ProjectObj, ProjectRespondsObj } from "../interfaces/Project";
import EditMilestones from "../components/EditMilestones";
import { UserObj, UserRole } from "../interfaces/UserObj";
import { MilestoneObj } from "../interfaces/Milestone";
import MarkdownEditor from "../components/MarkdownEditor";

interface Props {
    isEditing?: boolean;
}

function ProjectCreation({ isEditing = false }: Props) {
    const userInfo = useContext(UserContext);
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<ProjectObj | null>(null);

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
                Authorization: localStorage.getItem("token") ?? "",
            },
        });

        if (response.ok) {
            const json = await response.json();
            const projectResponse = json as ProjectRespondsObj;

            console.log(projectResponse);
            const milestones: MilestoneObj[] = projectResponse.milestones
                .map((milestone) => {
                    return {
                        id: milestone.milestoneId,
                        title: milestone.milestoneName,
                        estimatedEnd: milestone.estimateDate.split("T")[0],
                        description: milestone.description,
                        isDone: milestone.isDone,
                    };
                })
                .sort((a, b) => {
                    return b.estimatedEnd.localeCompare(a.estimatedEnd);
                });

            // Generate UserObj Array from ProjectResponseObj
            const userArray: UserObj[] = [];
            for (let index = 0; index < projectResponse.users.length; index++) {
                const user = projectResponse.users[index];
                userArray.push({
                    id: user.id,
                    username: user.username,
                    role: user.roles[0].id as UserRole,
                    label: "M.I.A.",
                    email: user.email,
                });
            }
            // Create current Project with data from the ProjectResponseObj
            const curProject = {
                id: projectResponse.projectId,
                title: projectResponse.projectName,
                estimatedEnd: projectResponse.estimateDate,
                startDate: projectResponse.startDate,
                description: projectResponse.description,
                users: userArray,
                milestones: milestones,
            };
            setProject(curProject);

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
                Authorization: localStorage.getItem("token") ?? "",
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
                users: [
                    {
                        id: userInfo.id,
                    },
                ],
            }),
        });

        if (response.ok) {
            const json = await response.json();

            const project = json as ProjectRespondsObj;

            navigate(`/edit-project/${project.projectId}`);
        }
    };

    const updateProject = async () => {
        if (!userInfo) return;

        const url = (import.meta.env.VITE_API_URL as string) + `projects/update-project/${id}`;

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") ?? "",
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

        if (response.ok) {
            navigate(`/edit-project/${id}`);
        }
    };

    return (
        <div className="container">
            {isEditing ? (
                <>
                    <h1 className="mt-3">Edit "{title}"</h1>
                </>
            ) : (
                <>
                    <h1 className="mt-3">Create a new Project</h1>
                </>
            )}

            <div className="card mt-3">
                <div className="card-header">
                    <h2 className="mb-0">General Information</h2>
                </div>
                <div className="card-body">
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
                                    className="form-control mt-2"
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
                            <MarkdownEditor
                                value={description}
                                onValueChanged={(value) => {
                                    setDescription(value);
                                }}
                                label="Description"
                            />
                        </div>
                        <div className="row g-3 mt-1">
                            <div className="col mt-2">
                                <label htmlFor="startDate">Start Date</label>
                                <input
                                    type="date"
                                    className="form-control mt-2"
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
                            <div className="col mt-2">
                                <label htmlFor="endDate">Estimated End Date</label>
                                <input
                                    type="date"
                                    className="form-control mt-2"
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

                        <div className="d-flex justify-content-end">
                            {isEditing ? (
                                <>
                                    <Button kind="link" className="mt-3">
                                        Cancel
                                    </Button>
                                    <Button type="submit" kind="success" className="mt-3">
                                        Save Changes
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button kind="link" className="mt-3">
                                        Cancel
                                    </Button>
                                    <Button type="submit" kind="success" className="mt-3">
                                        Create Project
                                    </Button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {isEditing ? (
                <div className="card mt-3">
                    <div className="card-header">
                        <h2 className="mb-0">Project Member</h2>
                    </div>
                    <div className="card-body">
                        <form className="mt-3">
                            <div>
                                {project && (
                                    <UserAssignment
                                        project={project}
                                        onUserEvent={() => {
                                            fetchProjects(project.id);
                                        }}
                                    />
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div />
            )}

            {isEditing ? (
                <>
                    <div className="card mt-3">
                        <div className="card-header">
                            {" "}
                            <h2 className="mb-0">Milestones</h2>
                        </div>
                        <div className="card-body">
                            {project && (
                                <EditMilestones
                                    project={project}
                                    onMilestoneEvent={() => {
                                        fetchProjects(project.id);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="m-3 d-flex justify-content-center align-items-center">
                        <Button
                            kind="success"
                            onClick={() => {
                                navigate(`/project/${id}`);
                            }}
                        >
                            <i className="bi bi-arrow-left me-2"></i>
                            Back
                        </Button>
                    </div>
                </>
            ) : (
                <div />
            )}
        </div>
    );
}

export default ProjectCreation;
