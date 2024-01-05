import { db } from "@/database/db";

export async function GET() {
    const raw_data = await db
        // Create column with concat'd skills
        .with(
            'with_skills',
            eb => eb
                .selectFrom('indeed_posts as post')
                .innerJoin('skills as sk', join => join.onTrue())
                .leftJoin(
                    'indeed_skill_labels as lbl',
                    join => join
                        .onRef('lbl.id_post', '=', 'post.id')
                        .onRef('lbl.id_skill', '=', 'sk.id')
                )
                .groupBy('post.id')
                .select(({ fn, val }) => fn.agg<string>("group_concat", ["sk.name", val(",")]).as("skills"))
                .havingRef(eb => eb.fn.countAll(), '=', eb => eb.fn.count('label'))
                .select(['post.id', 'post.title'])
        )
        // Create column with concat'd duties
        .with(
            'with_duties',
            eb => eb
                .selectFrom('with_skills as post')
                .innerJoin('duties as dt', join => join.onTrue())
                .leftJoin(
                    'indeed_duty_labels as lbl',
                    join => join
                        .onRef('lbl.id_post', '=', 'post.id')
                        .onRef('lbl.id_duty', '=', 'dt.id')
                )
                .groupBy('post.id')
                .select(({ fn, val }) => fn.agg<string>("group_concat", ["dt.name", val(",")]).as("duties"))
                .havingRef(eb => eb.fn.countAll(), '=', eb => eb.fn.count('label'))
                .select(['post.id', 'post.title', 'post.skills'])
        )
        // Include salary / clearance labels
        .with(
            'with_misc',
            eb => eb
                .selectFrom('with_duties as post')
                .innerJoin('indeed_misc_labels as lbl', 'lbl.id_post', 'post.id')
                .select(['post.id', 'post.title', 'post.skills', 'post.duties', 'lbl.salary', 'lbl.clearance'])
        )
        .selectFrom(
            'with_misc as post'
        )
        .selectAll()
        .limit(100)
        .execute()

    // Map skills / duties to string arrays
    const data = raw_data.map(d => ({
        ...d,
        skills: d.skills.split(','),
        duties: d.duties.split(',')
    }))

    return Response.json(data)
}