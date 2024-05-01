import { ProjectObj, ProjectRespondsObj } from "../interfaces/Project";
import { parseMilestoneResponseObjArray } from "./Milestone";
import { parseUserResponseObjArray } from "./User";

export function parseProjectResponseObjArray(projects: ProjectRespondsObj[]): ProjectObj[] {
    return (
        projects
            ?.map((project) => {
                return parseProjectResponseObj(project);
            })
            .sort((a, b) => {
                let comp = a.title.localeCompare(b.title);
                if (comp === 0) {
                    comp = a.id > b.id ? 1 : -1;
                }
                return comp;
            }) ?? []
    );
}

export function parseProjectResponseObj(project: ProjectRespondsObj): ProjectObj {
    return {
        id: project.projectId,
        title: project.projectName,
        estimatedEnd: project.estimateDate.split("T")[0],
        startDate: project.startDate.split("T")[0],
        description: project.description,
        milestones: parseMilestoneResponseObjArray(project.milestones),
        users: parseUserResponseObjArray(project.users),
    };
}

export async function fetchAllProjects() {
    const url = `${import.meta.env.VITE_API_URL as string}projects/all`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") ?? "",
        },
    });

    if (response.ok) {
        const json = await response.json();
        const projectRespondsArray = json as ProjectRespondsObj[];

        return parseProjectResponseObjArray(projectRespondsArray);
    } else {
        const error = await response.text();
        return Promise.reject(`Error ${response.status}: ${error}`);
    }
}

export async function fetchProject(projectId: number | string) {
    const url = `${import.meta.env.VITE_API_URL as string}projects/get/${projectId}`;

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

        return parseProjectResponseObj(projectResponse);
    } else {
        const error = await response.text();
        return Promise.reject(`Error ${response.status}: ${error}`);
    }
}
