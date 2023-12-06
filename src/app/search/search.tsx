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
                    <div className="flex flex-col gap-4">
                        <div className={styles.skill}>
                            <input name="s1" type="text" value="Python" />

                            <div className="flex gap-2">
                                <input
                                    name="s1-min"
                                    type="number"
                                    placeholder="0"
                                />
                                -
                                <input
                                    name="s1-max"
                                    type="number"
                                    placeholder="∞"
                                />
                            </div>
                        </div>
                        <div className={styles.skill}>
                            <input name="s2" type="text" value="TypeScript" />

                            <div className="flex gap-2">
                                <input
                                    name="s2-min"
                                    type="number"
                                    placeholder="0"
                                />
                                -
                                <input
                                    name="s2-max"
                                    type="number"
                                    placeholder="∞"
                                />
                            </div>
                        </div>
                        <div className={styles.skill}>
                            <input name="s3" type="text" value="Rust" />

                            <div className="flex gap-2">
                                <input
                                    name="s3-min"
                                    type="number"
                                    placeholder="0"
                                />
                                -
                                <input
                                    name="s3-max"
                                    type="number"
                                    placeholder="∞"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <hr />

                {/* Responsibilities */}
                <section>
                    <h1>Responsibilities</h1>
                    <div>
                        <input name="r1" type="checkbox" />
                        <label htmlFor="r1">On-Call</label>
                    </div>
                    <div>
                        <input name="r2" type="checkbox" />
                        <label htmlFor="r2">Design</label>
                    </div>
                </section>

                <hr />

                {/* Miscellaenous */}
                <section>
                    <div>
                        <h1>Salary</h1>

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
                        <h1>Clearance Requirements</h1>

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
                            <input name="clearance-no" type="radio" value="1" />
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
                </section>
            </section>
        </form>
    )
}
