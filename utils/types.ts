export type activeDailyCodingChallengeQuestion = {
    title: string,
    difficulty: string,
    link: string
}

export type Subscription = {
    subscription: boolean
}

export type TquestionOfToday = {
    data: {
        activeDailyCodingChallengeQuestion: {
            question: {
                title: string,
                difficulty: string,
            }
            link: string
        }
    }
}

export type TReqBody = {
    access_token_json: {
        accessToken: string
    },
    question_json: {
        title: string
        link: string
        difficulty: string
    }
}