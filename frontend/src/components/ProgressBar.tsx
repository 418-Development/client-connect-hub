interface Props {
    progress: number;
    height?: number;
}

function ProgressBar({ progress, height = 25 }: Props) {
    return (
        <div
            className="progress"
            role="progressbar"
            aria-label="Example with label"
            //aria-valuenow="25"
            //aria-valuemin="0"
            //aria-valuemax="100"
            style={{ height: height + "px" }}
        >
            <div className="progress-bar" style={{ width: progress + "%" }}>
                {progress}%
            </div>
        </div>
    );
}

export default ProgressBar;
