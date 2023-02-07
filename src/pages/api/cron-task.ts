import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../server/db';
import { activeDailyCodingChallengeQuestion } from '../../../utils/types';

const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql'
const TODOIST_API_ENDPOINT = 'https://api.todoist.com/rest/v2/tasks'

const DAILY_CODING_CHALLENGE_QUERY = `
query questionOfToday {
	activeDailyCodingChallengeQuestion {
		link
		question {
			difficulty
			title
		}
	}
}`

const fetchDailyCodingChallenge = async () => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY })
    }

    const response = await fetch(LEETCODE_API_ENDPOINT, options)
    const questionOfToday = await response.json()

    const title = questionOfToday.data.activeDailyCodingChallengeQuestion.question.title
    const difficulty = questionOfToday.data.activeDailyCodingChallengeQuestion.question.difficulty
    const link = `https://leetcode.com${questionOfToday.data.activeDailyCodingChallengeQuestion.link}`

    return { title, difficulty, link }
}

const createTodoistTask = async (question: activeDailyCodingChallengeQuestion) => {

    const questionTitle = question.title
    const questionDifficulty = question.difficulty
    const questionLink = `https://leetcode.com${question.link}`

    console.log("Creating Todoist task.")

    const body = {
        content: `[${questionTitle}](${questionLink})`,
        description: `Difficulty: ${questionDifficulty}`,
        due_string: 'Today',
        priority: 4
    }

    const users = await prisma.user.findMany({
        where: {
            subscription: true
        },
        include: {
            accounts: true
        }
    })

    const response = await Promise.all(
        users.map(async (user) => {
            const TOKEN = user.accounts[0]?.access_token

            const options = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`
                }
            }

            const response = await fetch(TODOIST_API_ENDPOINT, options)
            return response
        })
    )

    return response
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const header = req.headers['x-cron-token']

    if (header !== process.env.CRON_TOKEN) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    const question = await fetchDailyCodingChallenge()
    const response = await createTodoistTask(question)

    return res.status(200).json({
        response
    });
}