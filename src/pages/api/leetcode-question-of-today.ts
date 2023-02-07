import type { NextApiRequest, NextApiResponse } from 'next';

const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql';

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

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
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

    res.setHeader('Cache-Control', 's-maxage=3600');

    return res.status(200).json({
        title, difficulty, link
    });
}