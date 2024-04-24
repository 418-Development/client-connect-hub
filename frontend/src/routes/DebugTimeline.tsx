import Timeline from "../components/Timeline";

function DebugTimeline() {
    return (
        <div className="container mt-3">
            <Timeline
                milestones={[
                    { description: "# Description", id: 1, title: "Milestone 1", estimatedEnd: "01.04.2024", isDone: true },
                    { description: "# Description", id: 2, title: "Milestone 2", estimatedEnd: "06.04.2024", isDone: true },
                    { description: "# Description", id: 3, title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: false },
                    { description: "# Description", id: 4, title: "Milestone 4", estimatedEnd: "22.04.2024", isDone: false },
                    { description: "# Description", id: 5, title: "Milestone 5", estimatedEnd: "27.04.2024", isDone: false },
                ]}
                showMilestone={() => {}}
            />

            <div className="mt-5 mb-5"></div>

            <Timeline
                milestones={[
                    { description: "# Description", id: 1, title: "Milestone 1", estimatedEnd: "01.04.2024", isDone: true },
                    { description: "# Description", id: 2, title: "Milestone 2", estimatedEnd: "06.04.2024", isDone: true },
                    { description: "# Description", id: 3, title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: false },
                    { description: "# Description", id: 4, title: "Milestone 4", estimatedEnd: "22.04.2024", isDone: false },
                ]}
                onlyShowOverview
                showMilestone={() => {}}
            />

            <div className="mt-5 mb-5"></div>

            <Timeline
                milestones={[{ description: "# Description", id: 3, title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: false }]}
                onlyShowOverview
                showMilestone={() => {}}
            />

            <div className="mt-5 mb-5"></div>

            <Timeline
                milestones={[{ description: "# Description", id: 3, title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: true }]}
                onlyShowOverview
                showMilestone={() => {}}
            />

            <div className="mt-5 mb-5"></div>

            <Timeline
                milestones={[
                    { description: "# Description", id: 3, title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: false },
                    { description: "# Description", id: 4, title: "Milestone 4", estimatedEnd: "22.04.2024", isDone: false },
                ]}
                onlyShowOverview
                showMilestone={() => {}}
            />

            <div className="mt-5 mb-5"></div>

            <Timeline
                milestones={[
                    { description: "# Description", id: 3, title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: false },
                    { description: "# Description", id: 4, title: "Milestone 4", estimatedEnd: "22.04.2024", isDone: false },
                    { description: "# Description", id: 5, title: "Milestone 5", estimatedEnd: "27.04.2024", isDone: false },
                ]}
                onlyShowOverview
                showMilestone={() => {}}
            />

            <div className="mt-5 mb-5"></div>

            <Timeline
                milestones={[
                    { description: "# Description", id: 0, title: "Milestone 1", estimatedEnd: "01.04.2024", isDone: true },
                    { description: "# Description", id: 1, title: "Milestone 1", estimatedEnd: "01.04.2024", isDone: true },
                    { description: "# Description", id: 2, title: "Milestone 2", estimatedEnd: "06.04.2024", isDone: true },
                    { description: "# Description", id: 3, title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: false },
                ]}
                onlyShowOverview
                showMilestone={() => {}}
            />

            <div className="mt-5 mb-5"></div>

            <Timeline
                milestones={[
                    { description: "# Description", id: 1, title: "Milestone 1", estimatedEnd: "01.04.2024", isDone: true },
                    { description: "# Description", id: 2, title: "Milestone 2", estimatedEnd: "06.04.2024", isDone: true },
                    { description: "# Description", id: 3, title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: false },
                ]}
                onlyShowOverview
                showMilestone={() => {}}
            />

            <div className="mt-5 mb-5"></div>

            <Timeline
                milestones={[
                    { description: "# Description", id: 1, title: "Milestone 1", estimatedEnd: "01.04.2024", isDone: true },
                    { description: "# Description", id: 2, title: "Milestone 2", estimatedEnd: "06.04.2024", isDone: true },
                    { description: "# Description", id: 3, title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: true },
                ]}
                onlyShowOverview
                showMilestone={() => {}}
            />
        </div>
    );
}

export default DebugTimeline;
