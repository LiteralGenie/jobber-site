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

            {/* Filters */}
            <section>
                <h1>Filters</h1>

                {/* Skills */}
                <section>
                    <h2>Skills</h2>
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

                {/* Responsibilities */}
                <section>
                    <h2>Responsibilities</h2>
                    <div>
                        <input name="r1" type="checkbox" />
                        <label htmlFor="r1">On-Call</label>
                    </div>
                    <div>
                        <input name="r2" type="checkbox" />
                        <label htmlFor="r2">Design</label>
                    </div>
                </section>

                {/* Clearance */}
                <section>
                    <h2>Clearance Requirements</h2>
                    <div className="flex flex-col gap-1">
                        <div>
                            <input name="c1" type="checkbox" />
                            <label htmlFor="c1">Not Required</label>
                        </div>

                        <div>
                            <input name="c2" type="checkbox" />
                            <label htmlFor="c2">Required</label>
                        </div>
                    </div>
                </section>

                {/* Salary + Benefits */}
                <section>
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
                        <h2>Benefits</h2>

                        <div className="flex flex-col">
                            <div>
                                <input name="b1" type="checkbox" />
                                <label htmlFor="b1">401k</label>
                            </div>
                            <div>
                                <input name="b2" type="checkbox" />
                                <label htmlFor="b2">Insurance</label>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </form>
    )
}
