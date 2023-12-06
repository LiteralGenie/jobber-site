"use-client"

import styles from "./search.module.scss"

export default function Search() {
    return (
        <form className={styles["search-form"]}>
            {/* Search */}
            <section>
                <input
                    name="search"
                    type="text"
                    placeholder="software (developer|engineer)"
                    className="w-full"
                />
            </section>

            <hr />

            {/* Filters */}
            <section>
                {/* Skills */}
                <section>
                    <h1>Skills</h1>

                    <div className="flex flex-col gap-2">
                        <div>
                            <h2>Include</h2>
                            <div className="flex gap-2">
                                <select className="flex-1">
                                    <option value="">(empty)</option>
                                    <option value="python">Python</option>
                                    <option value="typescript">
                                        TypeScript
                                    </option>
                                    <option value="rust">Rust</option>
                                </select>
                                <select className="flex-1">
                                    <option value="0">0 years</option>
                                </select>
                                <button>x</button>
                            </div>
                            <p className={styles.instructions}>
                                "years" = years-of-experience
                                <br />
                                Listings requesting a greater amount will be
                                excluded.
                            </p>
                        </div>
                        <div>
                            <h2>Exclude</h2>
                            <div className="flex gap-2">
                                <select className="flex-1">
                                    <option value="">(empty)</option>
                                    <option value="python">Python</option>
                                    <option value="typescript">
                                        TypeScript
                                    </option>
                                    <option value="rust">Rust</option>
                                </select>
                                <button>x</button>
                            </div>
                        </div>
                    </div>
                </section>

                <hr />

                {/* Responsibilities */}
                <section>
                    <h1>Responsibilities</h1>

                    <div className="flex flex-col gap-2">
                        <div>
                            <h2>Include</h2>
                            <div className="flex gap-2">
                                <select className="flex-1">
                                    <option value="">(empty)</option>
                                    <option value="oncall">On-call</option>
                                    <option value="design">UI Design</option>
                                </select>
                                <button>x</button>
                            </div>
                        </div>
                        <div>
                            <h2>Exclude</h2>
                            <div className="flex gap-2">
                                <select className="flex-1">
                                    <option value="">(empty)</option>
                                    <option value="oncall">On-call</option>
                                    <option value="design">UI Design</option>
                                </select>
                                <button>x</button>
                            </div>
                        </div>
                    </div>
                </section>

                <hr />

                {/* Miscellaenous */}
                <section className="flex flex-col">
                    <h1>Miscellaneous</h1>

                    <div className="flex flex-col gap-4">
                        <div>
                            <h2>Salary</h2>

                            <div className="flex gap-2">
                                <input
                                    name="s3-min"
                                    type="number"
                                    placeholder="0"
                                    className="w-full"
                                />
                                -
                                <input
                                    name="s3-max"
                                    type="number"
                                    placeholder="∞"
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div>
                            <h2>Clearance Requirements</h2>

                            <div>
                                <input
                                    name="clearance-any"
                                    type="radio"
                                    value="0"
                                    checked
                                />
                                <label htmlFor="clearance-any">Any</label>
                            </div>

                            <div>
                                <input
                                    name="clearance-no"
                                    type="radio"
                                    value="1"
                                />
                                <label htmlFor="clearance-no">No</label>
                            </div>

                            <div>
                                <input
                                    name="clearance-yes"
                                    type="radio"
                                    value="2"
                                />
                                <label htmlFor="clearance-yes">Yes</label>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </form>
    )
}
