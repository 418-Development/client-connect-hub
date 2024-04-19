import { useState } from "react";
import Button from "../components/Button";
import Timeline from "../components/Timeline";
import { useNavigate } from "react-router-dom";

interface Props {
  isEditing?: boolean;
}

function ProjectCreation({ isEditing = false }: Props) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <div className="container">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();

          // saveTitleAndDescription();
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
            />
            <div className="invalid-feedback"></div>
          </div>
        </div>
        <div className="mt-3">
          <div>
            <label htmlFor="projectDescription">Project description</label>
            <input
              type="text"
              autoComplete="description"
              className="form-control"
              id="projectDescription"
              placeholder="Enter description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
            />
            <div className="invalid-feedback"></div>
          </div>
        </div>
        {isEditing? (
            <div>
            <Button type="submit" style="primary" className="mt-3 me-3">
                Save Changes
            </Button>
            <Button style="secondary" className="mt-3">
                Cancel
            </Button>
            </div>
        ) : ( <div/> )}
      </form>

      {isEditing? (
        <form className="mt-3">
            <div>
            <div>
                <p>Placeholder for the User Adding/Editing UI</p>
                <Button type="submit" style="primary" className="mt-3 me-3">
                Save Changes
                </Button>
                <Button style="secondary" className="mt-3">
                Cancel
                </Button>
            </div>
            </div>
        </form>
      ) : ( <div/> )}

      {isEditing? (
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
      ) : ( <div/> )}

      {isEditing ? (
        <div/>
      ) : (
        <form onSubmit={(e) => {
          e.preventDefault();

          const navigate = useNavigate()
          navigate("/edit-project")
        }}>
          <div>
            <Button type="submit" style="primary" className="mt-3 me-3">
              Create Project
            </Button>
            <Button style="secondary" className="mt-3">
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ProjectCreation;
