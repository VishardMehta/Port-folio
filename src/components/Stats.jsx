import useScrollReveal from '../hooks/useScrollReveal';
import kaggleData from '../data/kaggle.json';

export default function Stats() {
    const ref = useScrollReveal();

    return (
        <section className="section stats-section" id="stats" ref={ref}>
            <div className="section-header reveal">
                <span className="section-tag">Grind mode</span>
                <h2 className="section-title">
                    Numbers don&apos;t <span className="text-accent">lie.</span>
                </h2>
            </div>

            <div className="stats-grid reveal">
                {/* Kaggle Card */}
                <a
                    className="stats-card kaggle-card"
                    href="https://www.kaggle.com/vishardmehta"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="stats-card-label">Kaggle</div>

                    {/* 2x2 stats grid */}
                    <div className="k-nums">
                        <div className="k-stat">
                            <span className="k-val">{kaggleData.upvotes}</span>
                            <span className="k-key">Upvotes</span>
                        </div>
                        <div className="k-stat">
                            <span className="k-val">{kaggleData.downloads_display}</span>
                            <span className="k-key">Downloads</span>
                        </div>
                        <div className="k-stat">
                            <span className="k-val">{kaggleData.notebooks}</span>
                            <span className="k-key">Notebooks</span>
                        </div>
                        <div className="k-stat">
                            <span className="k-val">{kaggleData.datasets}</span>
                            <span className="k-key">Datasets</span>
                        </div>
                    </div>

                    {/* Medal sections by category */}
                    {/* Medal sections by category */}
                    <div className="k-medals-wrap">
                        <TierGroup
                            title="Datasets"
                            tier={kaggleData.datasets_tier}
                            medals={kaggleData.medals.datasets}
                        />
                        <div className="k-medal-divider"></div>
                        <TierGroup
                            title="Notebooks"
                            tier={kaggleData.notebooks_tier}
                            medals={kaggleData.medals.notebooks}
                        />
                    </div>
                </a>

                {/* GitHub Stats Card */}
                <div className="stats-card">
                    <div className="stats-card-label">GitHub</div>
                    <div className="stats-card-embed github-embed">
                        <img
                            src="https://github-readme-streak-stats.herokuapp.com/?user=VishardMehta&theme=transparent&hide_border=true&ring=eb5939&fire=eb5939&currStreakLabel=b7ab98&sideLabels=b7ab98&currStreakNum=e8e4de&sideNums=e8e4de&dates=555049"
                            alt="GitHub Streak"
                            className="stats-img"
                            loading="lazy"
                        />
                        <img
                            src="https://ghchart.rshah.org/eb5939/VishardMehta"
                            alt="GitHub Contributions"
                            className="stats-img github-chart"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function TierGroup({ title, tier, medals }) {
    return (
        <div className="k-medal-group">
            <span className="k-medal-title">{title}</span>
            <span className={`k-tier ${tier.toLowerCase()}`}>{tier}</span>
            <div className="k-medal-row">
                {medals.gold > 0 && <Medal type="gold" count={medals.gold} />}
                {medals.silver > 0 && <Medal type="silver" count={medals.silver} />}
                {medals.bronze > 0 && <Medal type="bronze" count={medals.bronze} />}
                {medals.gold === 0 && medals.silver === 0 && medals.bronze === 0 && (
                    <span className="k-no-medals">–</span>
                )}
            </div>
        </div>
    );
}

function Medal({ type, count }) {
    const colors = {
        gold: "#FFD700",
        silver: "#C0C0C0",
        bronze: "#CD7F32"
    };

    return (
        <div className={`k-m ${type}`} title={`${count} ${type} medals`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" fill={colors[type]} />
                <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke={colors[type]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{count}</span>
        </div>
    );
}
