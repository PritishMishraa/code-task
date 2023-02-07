import toast from 'react-hot-toast';

export default async function addTask() {
    const AccessTokenToast = toast.loading('Getting Access Token');
    const access_token = await fetch("/api/getAccessToken");
    const access_token_json = await access_token.json();
    toast.success('Getting Access Token', {
        id: AccessTokenToast,
    });

    const QuestionToast = toast.loading('Getting Leetcode Question');
    const question = await fetch("/api/leetcode-question-of-today");
    const question_json = await question.json();
    toast.success('Getting Leetcode Question', {
        id: QuestionToast,
    });

    const AddingTaskToast = toast.loading('Adding Task to Todoist');
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token_json, question_json })
    }

    const response = await fetch('/api/add-task', options);
    const res_json = response.json()

    toast.success('Adding Task to Todoist', {
        id: AddingTaskToast,
    });

    return res_json;
}