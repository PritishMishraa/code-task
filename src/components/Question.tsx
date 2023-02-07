import useSWRImmutable from 'swr/immutable';

import fetcher from '../../utils/fetcher';
import { activeDailyCodingChallengeQuestion } from '../../utils/types';

const Question = () => {
    const { data } = useSWRImmutable<activeDailyCodingChallengeQuestion>('/api/leetcode-question-of-today', fetcher)

    const title = new String(data?.title)
    const link = String(data?.link)
    const difficulty = new String(data?.difficulty)

    return (
        <div className="max-w-2xl w-full rounded-xl mt-16 bg-white/5 p-4">
            <div className="flex justify-between">
                <a href={link} target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline underline-offset-8">{title.toString() === 'undefined' ? '' : title}</a>
                <h1 className="font-bold text-white">{difficulty.toString() === 'undefined' ? '' : difficulty}</h1>
            </div>
        </div>
    )
}

export default Question