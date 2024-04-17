import Timeline from "./Timeline";

function DebugTimeline() {
    return (
        <div className="container mt-3">
            <Timeline
                milestones={[
                    { id: "milestone1", title: "Milestone 1", estimatedEnd: "01.04.2024", isDone: true },
                    { id: "milestone2", title: "Milestone 2", estimatedEnd: "06.04.2024", isDone: true },
                    { id: "milestone3", title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: false },
                    { id: "milestone4", title: "Milestone 4", estimatedEnd: "22.04.2024", isDone: false },
                    { id: "milestone5", title: "Milestone 5", estimatedEnd: "27.04.2024", isDone: false },
                ]}
            />

            <div className="mt-5 mb-5"></div>

            <Timeline
                milestones={[
                    { id: "milestone1", title: "Milestone 1", estimatedEnd: "01.04.2024", isDone: true },
                    { id: "milestone2", title: "Milestone 2", estimatedEnd: "06.04.2024", isDone: true },
                    { id: "milestone3", title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: false },
                    { id: "milestone4", title: "Milestone 4", estimatedEnd: "22.04.2024", isDone: false },
                    { id: "milestone5", title: "Milestone 5", estimatedEnd: "27.04.2024", isDone: false },
                ]}
                onlyShowOverview
            />

            <div className="mt-5 mb-5"></div>

            <Timeline
                milestones={[{ id: "milestone3", title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: false }]}
                onlyShowOverview
            />

            <div className="mt-5 mb-5"></div>

            <Timeline
                milestones={[{ id: "milestone3", title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: true }]}
                onlyShowOverview
            />

            <div className="mt-5 mb-5"></div>

            <Timeline
                milestones={[
                    { id: "milestone3", title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: false },
                    { id: "milestone4", title: "Milestone 4", estimatedEnd: "22.04.2024", isDone: false },
                ]}
                onlyShowOverview
            />

            <div className="mt-5 mb-5"></div>

            <Timeline
                milestones={[
                    { id: "milestone3", title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: false },
                    { id: "milestone4", title: "Milestone 4", estimatedEnd: "22.04.2024", isDone: false },
                    { id: "milestone5", title: "Milestone 5", estimatedEnd: "27.04.2024", isDone: false },
                ]}
                onlyShowOverview
            />

            <div className="mt-5 mb-5"></div>

            <Timeline
                milestones={[
                    { id: "milestone0", title: "Milestone 1", estimatedEnd: "01.04.2024", isDone: true },
                    { id: "milestone1", title: "Milestone 1", estimatedEnd: "01.04.2024", isDone: true },
                    { id: "milestone2", title: "Milestone 2", estimatedEnd: "06.04.2024", isDone: true },
                    { id: "milestone3", title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: false },
                ]}
                onlyShowOverview
            />

            <div className="mt-5 mb-5"></div>

            <Timeline
                milestones={[
                    { id: "milestone1", title: "Milestone 1", estimatedEnd: "01.04.2024", isDone: true },
                    { id: "milestone2", title: "Milestone 2", estimatedEnd: "06.04.2024", isDone: true },
                    { id: "milestone3", title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: false },
                ]}
                onlyShowOverview
            />

            <div className="mt-5 mb-5"></div>

            <Timeline
                milestones={[
                    { id: "milestone1", title: "Milestone 1", estimatedEnd: "01.04.2024", isDone: true },
                    { id: "milestone2", title: "Milestone 2", estimatedEnd: "06.04.2024", isDone: true },
                    { id: "milestone3", title: "Milestone 3", estimatedEnd: "18.04.2024", isDone: true },
                ]}
                onlyShowOverview
            />
        </div>
    );
}

export default DebugTimeline;
