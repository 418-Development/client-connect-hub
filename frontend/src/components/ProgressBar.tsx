import React from "react";

interface Props {
    progress: number;
    height?: number;
    width?: number;
    vertical?: boolean;
}

function ProgressBar({ progress, width, height, vertical = false }: Props) {
    let heightUnit = "px";
    if (vertical && width === undefined) width = 25;
    if (height === undefined) {
        if (vertical) {
            height = 100;
            heightUnit = "%";
        } else {
            height = 20;
        }
    }

    const css: React.CSSProperties = { height: height + heightUnit };
    if (width) css["width"] = `${width  }px`;

    return (
        <div
            className="progress"
            role="progressbar"
            aria-label="Example with label"
            //aria-valuenow="25"
            //aria-valuemin="0"
            //aria-valuemax="100"
            style={css}
        >
            <div className="progress-bar" style={vertical ? { height: `${progress  }%`, width: "100%" } : { width: `${progress  }%` }}>
                {progress}%
            </div>
        </div>
    );
}

export default ProgressBar;
