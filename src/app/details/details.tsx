import { JobData } from "@/lib/job-data"
import Requirements from "./requirements"
import Responsibilities from "./responsibilities"

export interface DetailsProps {
    data: JobData
}

export default function Details({ data }: DetailsProps) {
    return (
        <section className="border-2 rounded-md h-full w-full p-4">
            <section>
                <p>{`Location: ${data.location || "???"}`}</p>
                <p>{`Salary: ${humanizeSalary(data.salary)}`}</p>
                <p>Clearance required: {data.clearance ? " Yes" : " No"}</p>

                {Object.keys(data.skills).length ? (
                    <Requirements skills={data.skills} />
                ) : (
                    ""
                )}

                {data.responsibilities.length ? (
                    <Responsibilities
                        responsibilities={data.responsibilities}
                    />
                ) : (
                    ""
                )}
            </section>

            <hr className="my-4" />

            <section>{data.description}</section>
        </section>
    )
}

function humanizeSalary(salary: JobData["salary"]): string {
    if (!salary) {
        return "???"
    } else if (salary.max) {
        return `${salary.min} - ${salary.max}`
    } else {
        return `${salary.min}+`
    }
}
