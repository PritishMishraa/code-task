import { NextApiRequest, NextApiResponse } from "next";

const TODOIST_API_ENDPOINT = 'https://api.todoist.com/rest/v2/tasks'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { access_token_json, question_json: question } = req.body;

    const accessToken = access_token_json.accessToken;

    const questionTitle = question.title;
    const questionLink = question.link;
    const questionDifficulty = question.difficulty;

    const body = {
        content: `[${questionTitle}](${questionLink})`,
        description: `Difficulty: ${questionDifficulty}`,
        due_string: 'Today',
        priority: 4
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    }

    const response = await fetch(TODOIST_API_ENDPOINT, options);
    const res_json = await response.json();

    res.status(200).json(res_json);
}