import './ProgressBar.css';

export default function ProgressBar({ current, total, label }) {
    const percent = total > 0 ? Math.round((current / total) * 100) : 0;

    return (
        <div className="progress-wrapper">
            {label && <span className="progress-label">{label}</span>}
            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{ width: `${percent}%` }}
                />
            </div>
            <span className="progress-text">{current} / {total}</span>
        </div>
    );
}
