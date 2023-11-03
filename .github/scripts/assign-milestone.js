// This script should be placed in .github/scripts/assign-milestone.js

export default async ({ github, context }) => {
	const issue_number = context.issue.number;
	const milestone_number = 1; // Replace with your milestone number

	try {
		await github.rest.issues.update({
			owner: context.repo.owner,
			repo: context.repo.repo,
			issue_number: issue_number,
			milestone: milestone_number,
		});
		console.log(
			`Milestone ${milestone_number} assigned to issue ${issue_number}`
		);
	} catch (error) {
		console.error(`Error assigning milestone: ${error}`);
		throw error; // This will fail the workflow step
	}
};
